import { Bot } from 'lucide-react'

export default function LoadingIndicator() {
  return (
    <div className="flex gap-3 px-4 py-4" role="status" aria-label="AI is thinking">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
        <Bot size={16} />
      </div>
      <div className="flex items-center gap-2 rounded-2xl bg-zinc-100 px-4 py-3 dark:bg-zinc-800">
        <span className="flex gap-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" />
        </span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">AI is thinking…</span>
      </div>
    </div>
  )
}
