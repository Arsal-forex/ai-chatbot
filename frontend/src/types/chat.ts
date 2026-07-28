export type MessageRole = 'user' | 'assistant'

export type MessageStatus = 'sending' | 'sent' | 'error'

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  createdAt: string
  status?: MessageStatus
}

export interface Conversation {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  messages: ChatMessage[]
}

/** Lightweight shape used for sidebar chat history listings. */
export interface ConversationSummary {
  id: string
  title: string
  updatedAt: string
}

/** Request body sent to the FastAPI `POST /chat` endpoint. */
export interface ChatApiRequest {
  message: string
  conversation_id: string
}

/** Response body returned by the FastAPI `POST /chat` endpoint. */
export interface ChatApiResponse {
  response: string
  conversation_id: string
}

export type ChatErrorKind = 'network' | 'timeout' | 'api' | 'empty' | 'unknown'

export interface ChatError {
  kind: ChatErrorKind
  message: string
}
