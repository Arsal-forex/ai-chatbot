import type { Conversation } from '../types/chat'

const CONVERSATIONS_KEY = 'ai-chatbot:conversations'
const ACTIVE_CONVERSATION_KEY = 'ai-chatbot:active-conversation-id'

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJson<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage may be unavailable (private browsing, quota exceeded, etc.)
    // Failing silently keeps the chat usable in-memory for the session.
  }
}

export function loadConversations(): Conversation[] {
  return readJson<Conversation[]>(CONVERSATIONS_KEY, [])
}

export function saveConversations(conversations: Conversation[]): void {
  writeJson(CONVERSATIONS_KEY, conversations)
}

export function loadActiveConversationId(): string | null {
  return readJson<string | null>(ACTIVE_CONVERSATION_KEY, null)
}

export function saveActiveConversationId(id: string | null): void {
  writeJson(ACTIVE_CONVERSATION_KEY, id)
}
