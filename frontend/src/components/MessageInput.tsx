import { useEffect, useRef, type KeyboardEvent } from 'react'
import { Mic, Paperclip, Send } from 'lucide-react'

interface MessageInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  isLoading: boolean
}

const MAX_TEXTAREA_HEIGHT = 200

export default function MessageInput({ value, onChange, onSend, isLoading }: MessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`
  }, [value])

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      if (value.trim() && !isLoading) {
        onSend()
      }
    }
  }

  const canSend = value.trim().length > 0 && !isLoading

  return (
    <div className="border-t border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2 focus-within:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:focus-within:border-zinc-500">
        <button
          type="button"
          disabled
          title="Attachments coming soon"
          aria-label="Attach a file"
          className="shrink-0 rounded-md p-1.5 text-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Paperclip size={18} />
        </button>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message AI Chatbot…"
          rows={1}
          aria-label="Message input"
          className="thin-scrollbar max-h-[200px] flex-1 resize-none bg-transparent py-1.5 text-sm text-zinc-800 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
        />

        <button
          type="button"
          disabled
          title="Voice input coming soon"
          aria-label="Use microphone"
          className="shrink-0 rounded-md p-1.5 text-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Mic size={18} />
        </button>

        <button
          type="button"
          onClick={onSend}
          disabled={!canSend}
          aria-label="Send message"
          className="flex shrink-0 items-center justify-center rounded-lg bg-zinc-900 p-2 text-white transition-colors enabled:hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-zinc-900 dark:enabled:hover:bg-zinc-200"
        >
          <Send size={16} />
        </button>
      </div>
      <p className="mx-auto mt-1.5 max-w-3xl text-center text-[11px] text-zinc-400">
        Press Enter to send, Shift + Enter for a new line
      </p>
    </div>
  )
}
