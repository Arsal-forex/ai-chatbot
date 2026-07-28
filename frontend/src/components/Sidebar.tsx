import { MessageSquare, PanelLeftClose, PanelLeftOpen, Plus, Settings, Sparkles, User, X } from 'lucide-react'
import type { ConversationSummary } from '../types/chat'
import { formatRelativeTime } from '../utils/formatTime'
import { cn } from '../utils/cn'

interface SidebarProps {
  conversations: ConversationSummary[]
  activeConversationId: string | null
  onSelectConversation: (id: string) => void
  onNewChat: () => void
  /** Mobile slide-out drawer state. */
  isMobileOpen: boolean
  onCloseMobile: () => void
  /** Desktop collapse-to-rail state. */
  isCollapsed: boolean
  onToggleCollapsed: () => void
}

export default function Sidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  isMobileOpen,
  onCloseMobile,
  isCollapsed,
  onToggleCollapsed,
}: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex h-full flex-col border-r border-zinc-200 bg-zinc-50 transition-transform duration-200 ease-out dark:border-zinc-800 dark:bg-zinc-950',
          'md:static md:z-auto md:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full',
          isCollapsed ? 'md:w-16' : 'md:w-72',
          'w-72',
        )}
        aria-label="Chat sidebar"
      >
        {/* Top section */}
        <div className="flex items-center justify-between gap-2 border-b border-zinc-200 p-3 dark:border-zinc-800">
          <div className={cn('flex min-w-0 items-center gap-2', isCollapsed && 'md:hidden')}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
              <Sparkles size={18} />
            </div>
            <span className="truncate font-semibold text-zinc-900 dark:text-zinc-100">AI Chatbot</span>
          </div>

          <button
            type="button"
            onClick={onCloseMobile}
            className="rounded-md p-1.5 text-zinc-500 hover:bg-zinc-200 md:hidden dark:text-zinc-400 dark:hover:bg-zinc-800"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>

          <button
            type="button"
            onClick={onToggleCollapsed}
            className="hidden rounded-md p-1.5 text-zinc-500 hover:bg-zinc-200 md:block dark:text-zinc-400 dark:hover:bg-zinc-800"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        {/* New chat button */}
        <div className="p-3">
          <button
            type="button"
            onClick={onNewChat}
            className={cn(
              'flex w-full items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800',
              isCollapsed && 'md:justify-center md:px-2',
            )}
          >
            <Plus size={18} className="shrink-0" />
            <span className={cn(isCollapsed && 'md:hidden')}>New Chat</span>
          </button>
        </div>

        {/* Chat history */}
        <nav
          className={cn(
            'thin-scrollbar flex-1 overflow-y-auto px-2 pb-2',
            isCollapsed && 'md:hidden',
          )}
          aria-label="Chat history"
        >
          <p className="px-2 pb-1 pt-2 text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
            Recent chats
          </p>
          <ul className="flex flex-col gap-0.5">
            {conversations.map((conversation) => {
              const isActive = conversation.id === activeConversationId
              return (
                <li key={conversation.id}>
                  <button
                    type="button"
                    onClick={() => onSelectConversation(conversation.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm transition-colors',
                      isActive
                        ? 'bg-zinc-200/70 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                        : 'text-zinc-600 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:bg-zinc-800/60',
                    )}
                  >
                    <MessageSquare size={16} className="shrink-0 text-zinc-400" />
                    <span className="min-w-0 flex-1 truncate">{conversation.title}</span>
                    <span className="shrink-0 text-xs text-zinc-400">
                      {formatRelativeTime(conversation.updatedAt)}
                    </span>
                  </button>
                </li>
              )
            })}
            {conversations.length === 0 && (
              <li className="px-2 py-4 text-center text-xs text-zinc-400">No conversations yet</li>
            )}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="border-t border-zinc-200 p-2 dark:border-zinc-800">
          <button
            type="button"
            className={cn(
              'flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:bg-zinc-800/60',
              isCollapsed && 'md:justify-center',
            )}
          >
            <Settings size={18} className="shrink-0" />
            <span className={cn(isCollapsed && 'md:hidden')}>Settings</span>
          </button>
          <button
            type="button"
            className={cn(
              'flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-200/50 dark:text-zinc-300 dark:hover:bg-zinc-800/60',
              isCollapsed && 'md:justify-center',
            )}
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-300 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">
              <User size={16} />
            </div>
            <span className={cn('truncate', isCollapsed && 'md:hidden')}>Guest User</span>
          </button>
        </div>
      </aside>
    </>
  )
}
