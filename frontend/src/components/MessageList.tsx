import { useEffect, useRef } from 'react'
import type { ChatMessage as ChatMessageType } from '../types/chat'
import ChatMessage from './ChatMessage'
import EmptyChat from './EmptyChat'
import LoadingIndicator from './LoadingIndicator'

interface MessageListProps {
  messages: ChatMessageType[]
  isLoading: boolean
  onSelectPrompt: (prompt: string) => void
}

export default function MessageList({ messages, isLoading, onSelectPrompt }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, isLoading])

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 overflow-y-auto">
        <EmptyChat onSelectPrompt={onSelectPrompt} />
      </div>
    )
  }

  return (
    <div className="thin-scrollbar flex-1 overflow-y-auto" role="log" aria-live="polite">
      <div className="mx-auto flex max-w-3xl flex-col">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && <LoadingIndicator />}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
