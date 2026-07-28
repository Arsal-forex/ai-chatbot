import { useState } from 'react'
import Sidebar from './components/Sidebar'
import ChatHeader from './components/ChatHeader'
import MessageList from './components/MessageList'
import MessageInput from './components/MessageInput'
import ErrorMessage from './components/ErrorMessage'
import { useChat } from './hooks/useChat'

export default function App() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const {
    conversations,
    activeConversationId,
    activeConversationTitle,
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
  } = useChat()

  function handleSelectConversation(id: string) {
    selectConversation(id)
    setIsMobileSidebarOpen(false)
  }

  function handleNewChat() {
    newChat()
    setIsMobileSidebarOpen(false)
  }

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewChat={handleNewChat}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapsed={() => setIsSidebarCollapsed((prev) => !prev)}
      />

      <main className="flex min-w-0 flex-1 flex-col">
        <ChatHeader
          title={activeConversationTitle}
          modelName="AI Assistant"
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        <MessageList messages={messages} isLoading={isLoading} onSelectPrompt={selectPrompt} />

        {error && <ErrorMessage message={error.message} onRetry={retry} />}

        <MessageInput value={input} onChange={setInput} onSend={send} isLoading={isLoading} />
      </main>
    </div>
  )
}
