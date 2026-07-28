import type { ChatApiRequest, ChatApiResponse } from '../types/chat'

/**
 * Base URL of the FastAPI backend. Configure via `.env` (VITE_API_URL).
 * Never hardcode this elsewhere — every request should go through `sendMessage` below.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

/** Set to `true` once your FastAPI `POST /chat` endpoint is up and reachable. */
const USE_REAL_API = true

const REQUEST_TIMEOUT_MS = 20_000

export class ApiError extends Error {
  readonly kind: 'network' | 'timeout' | 'api' | 'empty'

  constructor(message: string, kind: 'network' | 'timeout' | 'api' | 'empty') {
    super(message)
    this.name = 'ApiError'
    this.kind = kind
  }
}

/**
 * Simulates network latency and produces a canned reply so the UI can be
 * demonstrated end-to-end before the FastAPI backend exists.
 *
 * --- REPLACE ME ---
 * Delete this function (and the branch that calls it in `sendMessage`) once
 * `callRealChatApi` is wired up to a live backend.
 */
async function mockChatApi(request: ChatApiRequest): Promise<ChatApiResponse> {
  const delay = 500 + Math.random() * 900
  await new Promise((resolve) => setTimeout(resolve, delay))

  const trimmed = request.message.trim().toLowerCase()

  let response: string
  if (trimmed === 'hello' || trimmed === 'hi') {
    response = "Hello! I'm your AI assistant. How can I help you today?"
  } else if (trimmed.length === 0) {
    response = "I didn't receive any message. Could you try again?"
  } else {
    response = `This is a simulated response to: "${request.message}". Connect the FastAPI backend in src/services/api.ts to get real AI-generated answers.`
  }

  return {
    response,
    conversation_id: request.conversation_id,
  }
}

/**
 * Calls the real FastAPI backend at `POST {VITE_API_URL}/chat`.
 *
 * Expected request body:  { message: string, conversation_id: string }
 * Expected response body: { response: string, conversation_id: string }
 */
async function callRealChatApi(request: ChatApiRequest): Promise<ChatApiResponse> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  let res: Response
  try {
    res = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal: controller.signal,
    })
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new ApiError('The request took too long to respond.', 'timeout')
    }
    throw new ApiError('Unable to reach the server. Check your connection.', 'network')
  } finally {
    clearTimeout(timeoutId)
  }

  if (!res.ok) {
    throw new ApiError(`The server responded with an error (${res.status}).`, 'api')
  }

  const data = (await res.json()) as ChatApiResponse

  if (!data.response) {
    throw new ApiError('The server returned an empty response.', 'empty')
  }

  return data
}

/**
 * Single entry point the rest of the app uses to talk to the backend.
 *
 * --- HOW TO CONNECT YOUR FASTAPI BACKEND ---
 * 1. Set `VITE_API_URL` in `.env` to your FastAPI server's URL.
 * 2. Implement `POST /chat` on the backend (see ChatApiRequest/ChatApiResponse in
 *    src/types/chat.ts for the exact request/response shape expected).
 * 3. Flip `USE_REAL_API` above to `true`.
 * That's it — no other file needs to change.
 */
export async function sendMessage(request: ChatApiRequest): Promise<ChatApiResponse> {
  if (!request.message.trim()) {
    throw new ApiError('Message cannot be empty.', 'empty')
  }

  return USE_REAL_API ? callRealChatApi(request) : mockChatApi(request)
}
