'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const WELCOME_MSG: Message = {
  role: 'assistant',
  content:
    '你好！(nǐ hǎo) Salom! 👋\n\nMen sizning xitoy tili o\'qituvchingizman 老师 (lǎoshī).\n\nNimadan boshlaymiz?\n\n🌱 "Birinchi dars" — boshlang\'ich so\'zlar\n📖 "Tarjima qil: ..." — so\'z/gap tarjimasi\n🎯 "Quiz boshla" — bilimingizni sinab ko\'ring\n💬 "Dialog mashqi" — real vaziyatda gap tuzish\n📝 "Grammatika: ..." — qoidalarni o\'rganing\n🔤 Yoki shunchaki savol bering!\n\nQaysi biri qiziq? 😊',
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MSG])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) inputRef.current?.focus()
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('chat-open', open)
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.classList.remove('chat-open')
      }
    }
  }, [open])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { role: 'user', content: text }
    const history = [...messages, userMsg]
    setMessages(history)
    setInput('')
    setLoading(true)

    const assistantMsg: Message = { role: 'assistant', content: '' }
    setMessages([...history, assistantMsg])

    try {
      const firstUserIdx = history.findIndex((m) => m.role === 'user')
      const apiMessages = history
        .slice(firstUserIdx)
        .map((m) => ({ role: m.role, content: m.content }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({ error: 'Server xatosi' }))
        throw new Error(errData.error || 'Server xatosi')
      }

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        fullText += decoder.decode(value, { stream: true })
        setMessages([...history, { role: 'assistant', content: fullText }])
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Xato yuz berdi'
      setMessages([
        ...history,
        { role: 'assistant', content: `⚠️ ${msg}. Qayta urinib ko'ring.` },
      ])
    } finally {
      setLoading(false)
    }
  }, [input, loading, messages])

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 shadow-lg shadow-purple-900/50 flex items-center justify-center hover:scale-110 transition-transform duration-200"
        aria-label="AI yordamchi"
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat panel - full height on right */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen w-full sm:w-[420px] lg:w-[32rem] 2xl:w-[36rem] flex flex-col shadow-2xl shadow-black/60 border-l border-white/10 bg-gray-950 transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-4 bg-gradient-to-r from-violet-700 to-purple-800">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-tight">Xitoy tili yordamchisi</p>
            <p className="text-purple-200 text-xs">中文助手 · AI</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="ml-auto text-white/70 hover:text-white transition-colors p-1"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-gray-950">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${
                  msg.role === 'user'
                    ? 'bg-violet-600'
                    : 'bg-gradient-to-br from-purple-700 to-violet-900'
                }`}
              >
                {msg.role === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-[15px] whitespace-pre-wrap leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-violet-600 text-white rounded-tr-md'
                    : 'bg-gray-800/80 text-gray-100 rounded-tl-md border border-white/5'
                }`}
              >
                {msg.content}
                {msg.role === 'assistant' && loading && i === messages.length - 1 && msg.content === '' && (
                  <span className="inline-flex gap-1.5 items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </span>
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-4 bg-gray-950 border-t border-white/5">
          <div className="relative bg-gray-900 rounded-3xl border border-white/10 focus-within:border-violet-500/60 focus-within:shadow-lg focus-within:shadow-violet-900/20 transition-all">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Xitoy tili haqida savol bering..."
              rows={1}
              disabled={loading}
              className="w-full resize-none bg-transparent text-white text-[15px] rounded-3xl pl-5 pr-14 py-4 outline-none placeholder-gray-500 max-h-48 overflow-y-auto disabled:opacity-50"
              style={{ lineHeight: '1.5', minHeight: '56px' }}
              onInput={(e) => {
                const el = e.currentTarget
                el.style.height = 'auto'
                el.style.height = Math.min(el.scrollHeight, 192) + 'px'
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="absolute bottom-2.5 right-2.5 w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-md"
              aria-label="Yuborish"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
          <p className="text-[11px] text-gray-600 mt-2 text-center">
            Enter — yuborish · Shift+Enter — yangi qator
          </p>
        </div>
      </div>
    </>
  )
}
