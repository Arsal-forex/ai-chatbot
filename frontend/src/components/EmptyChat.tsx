import { Sparkles } from 'lucide-react'
import { suggestedPrompts } from '../data/suggestedPrompts'

interface EmptyChatProps {
  onSelectPrompt: (prompt: string) => void
}

export default function EmptyChat({ onSelectPrompt }: EmptyChatProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4 py-10 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
        <Sparkles size={22} />
      </div>
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">How can I help you today?</h2>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Ask a question or try one of the suggestions below.
      </p>

      <div className="mt-6 grid w-full max-w-lg grid-cols-1 gap-2 sm:grid-cols-2">
        {suggestedPrompts.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectPrompt(item.prompt)}
            className="rounded-lg border border-zinc-200 bg-white p-3 text-left text-sm text-zinc-700 shadow-sm transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  )
}
