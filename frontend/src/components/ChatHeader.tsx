import { Menu } from 'lucide-react'

interface ChatHeaderProps {
  title: string
  modelName?: string
  onOpenMobileSidebar: () => void
}

export default function ChatHeader({ title, modelName, onOpenMobileSidebar }: ChatHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-2 border-b border-zinc-200 bg-white/80 px-4 py-3 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80">
      <button
        type="button"
        onClick={onOpenMobileSidebar}
        className="rounded-md p-1.5 text-zinc-500 hover:bg-zinc-100 md:hidden dark:text-zinc-400 dark:hover:bg-zinc-800"
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h1>
      </div>

      {modelName && (
        <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
          {modelName}
        </span>
      )}
    </header>
  )
}
