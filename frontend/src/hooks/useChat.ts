import { useCallback, useMemo, useRef, useState } from 'react'
import type { ChatError, ChatMessage, Conversation, ConversationSummary } from '../types/chat'
import { ApiError, sendMessage as sendMessageToApi } from '../services/api'
import { mockConversations } from '../data/mockChats'
import {
  loadActiveConversationId,
  loadConversations,
  saveActiveConversationId,
  saveConversations,
} from '../utils/storage'

function generateId(): string {
  return crypto.randomUUID()
}

function deriveTitle(message: string): string {
  const trimmed = message.trim()
  if (trimmed.length <= 40) return trimmed
  return `${trimmed.slice(0, 40).trimEnd()}…`
}

function createEmptyConversation(): Conversation {
  const now = new Date().toISOString()
  return {
    id: generateId(),
    title: 'New Chat',
    createdAt: now,
    updatedAt: now,
    messages: [],
  }
}

function initConversations(): Conversation[] {
  const stored = loadConversations()
  return stored.length > 0 ? stored : mockConversations
}

export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>(initConversations)
  const [activeConversationId, setActiveConversationId] = useState<string | null>(() => {
    const storedId = loadActiveConversationId()
    if (storedId && conversations.some((c) => c.id === storedId)) return storedId
    return conversations[0]?.id ?? null
  })
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ChatError | null>(null)
  const lastFailedMessageRef = useRef<string | null>(null)

  const persist = useCallback((next: Conversation[]) => {
    setConversations(next)
    saveConversations(next)
  }, [])

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeConversationId) ?? null,
    [conversations, activeConversationId],
  )

  const messages: ChatMessage[] = activeConversation?.messages ?? []

  const conversationSummaries: ConversationSummary[] = useMemo(
    () =>
      [...conversations]
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .map(({ id, title, updatedAt }) => ({ id, title, updatedAt })),
    [conversations],
  )

  const selectConversation = useCallback((id: string) => {
    setActiveConversationId(id)
    saveActiveConversationId(id)
    setError(null)
  }, [])

  const newChat = useCallback(() => {
    const conversation = createEmptyConversation()
    const next = [conversation, ...conversations]
    persist(next)
    setActiveConversationId(conversation.id)
    saveActiveConversationId(conversation.id)
    setInput('')
    setError(null)
  }, [conversations, persist])

  const dispatchMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || isLoading) return

      setError(null)
      lastFailedMessageRef.current = trimmed

      let conversation = activeConversation
      let workingConversations = conversations

      if (!conversation) {
        conversation = createEmptyConversation()
        workingConversations = [conversation, ...conversations]
      }

      const now = new Date().toISOString()
      const userMessage: ChatMessage = {
        id: generateId(),
        role: 'user',
        content: trimmed,
        createdAt: now,
        status: 'sent',
      }

      const isFirstMessage = conversation.messages.length === 0
      const updatedConversation: Conversation = {
        ...conversation,
        title: isFirstMessage ? deriveTitle(trimmed) : conversation.title,
        updatedAt: now,
        messages: [...conversation.messages, userMessage],
      }

      const withUserMessage = workingConversations.map((c) =>
        c.id === updatedConversation.id ? updatedConversation : c,
      )
      persist(withUserMessage)
      setActiveConversationId(updatedConversation.id)
      saveActiveConversationId(updatedConversation.id)
      setInput('')
      setIsLoading(true)

      try {
        const result = await sendMessageToApi({
          message: trimmed,
          conversation_id: updatedConversation.id,
        })

        const assistantMessage: ChatMessage = {
          id: generateId(),
          role: 'assistant',
          content: result.response,
          createdAt: new Date().toISOString(),
          status: 'sent',
        }

        setConversations((prev) => {
          const next = prev.map((c) =>
            c.id === updatedConversation.id
              ? { ...c, updatedAt: assistantMessage.createdAt, messages: [...c.messages, assistantMessage] }
              : c,
          )
          saveConversations(next)
          return next
        })
        lastFailedMessageRef.current = null
      } catch (err) {
        const apiError = err instanceof ApiError ? err : new ApiError('Something went wrong. Please try again.', 'network')
        setError({ kind: apiError.kind, message: apiError.message })

        setConversations((prev) => {
          const next = prev.map((c) =>
            c.id === updatedConversation.id
              ? {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === userMessage.id ? { ...m, status: 'error' as const } : m,
                  ),
                }
              : c,
          )
          saveConversations(next)
          return next
        })
      } finally {
        setIsLoading(false)
      }
    },
    [activeConversation, conversations, isLoading, persist],
  )

  const send = useCallback(() => {
    void dispatchMessage(input)
  }, [dispatchMessage, input])

  const retry = useCallback(() => {
    const lastMessage = lastFailedMessageRef.current
    if (lastMessage) {
      void dispatchMessage(lastMessage)
    }
  }, [dispatchMessage])

  const selectPrompt = useCallback((prompt: string) => {
    setInput(prompt)
  }, [])

  return {
    conversations: conversationSummaries,
    activeConversationId,
    activeConversationTitle: activeConversation?.title ?? 'New Chat',
    messages,
    input,
    setInput,
    isLoading,
    error,
    selectConversation,
    newChat,
    send,
    retry,
    selectPrompt,
  }
}
