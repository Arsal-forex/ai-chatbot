import { isValidElement, useRef, useState, type ComponentPropsWithoutRef } from 'react'
import { Check, Copy } from 'lucide-react'

function extractLanguage(children: React.ReactNode): string | null {
  if (isValidElement(children)) {
    const className = (children.props as { className?: string }).className ?? ''
    const match = /language-(\w+)/.exec(className)
    return match ? match[1] : null
  }
  return null
}

/** Custom renderer for fenced code blocks in AI markdown responses, with a copy button. */
export default function CodeBlock({ children, ...props }: ComponentPropsWithoutRef<'pre'>) {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)
  const language = extractLanguage(children)

  async function handleCopy() {
    const text = preRef.current?.textContent ?? ''
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="group relative my-3 overflow-hidden rounded-lg border border-zinc-800">
      <div className="flex items-center justify-between bg-zinc-800 px-3 py-1.5">
        <span className="text-xs font-medium text-zinc-400">{language ?? 'code'}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 rounded px-1.5 py-0.5 text-xs text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check size={13} /> Copied
            </>
          ) : (
            <>
              <Copy size={13} /> Copy
            </>
          )}
        </button>
      </div>
      <pre
        ref={preRef}
        {...props}
        className="thin-scrollbar overflow-x-auto bg-zinc-900 p-3 text-sm"
      >
        {children}
      </pre>
    </div>
  )
}
