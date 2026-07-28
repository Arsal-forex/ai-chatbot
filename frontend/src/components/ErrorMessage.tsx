import { AlertTriangle, RotateCw } from 'lucide-react'

interface ErrorMessageProps {
  message?: string
  onRetry: () => void
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="mx-4 my-3 flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
    >
      <div className="flex items-center gap-2">
        <AlertTriangle size={16} className="shrink-0" />
        <span>{message ?? 'Something went wrong. Please try again.'}</span>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="flex shrink-0 items-center gap-1.5 rounded-md border border-red-300 bg-white px-2.5 py-1 text-xs font-medium text-red-700 transition-colors hover:bg-red-100 dark:border-red-800 dark:bg-transparent dark:text-red-300 dark:hover:bg-red-950/60"
      >
        <RotateCw size={13} />
        Retry
      </button>
    </div>
  )
}
