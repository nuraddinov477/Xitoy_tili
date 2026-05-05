import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `Siz "Xitoy tili yordamchisi" — o'zbek tilini biladigan xitoy tili o'qituvchisisiz.

Qoidalar:
1. Har doim O'ZBEK TILIDA javob bering
2. Xitoycha so'z yoki iboralarni DOIM ierogliflar va pinyin bilan ko'rsating: 你好 (nǐ hǎo)
3. HSK 1 va HSK 2 darajasidagi so'zlar va grammatikani tushuntiring
4. So'zlarni tarjima qilib, misol gaplar bering
5. Foydalanuvchi quiz so'rasa, savol bering va javobini tekshiring
6. Qisqa, aniq va do'stona javob bering

Misol javob formati:
- So'z: 苹果 (píngguǒ) = olma
- Misol: 我吃苹果 (Wǒ chī píngguǒ) — Men olma yeyman
- Grammatika izohini o'zbek tilida bering`

type ChatMessage = { role: 'user' | 'assistant'; content: string }

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as { messages: ChatMessage[] }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY topilmadi' }, { status: 500 })
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    })

    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))
    const lastMessage = messages[messages.length - 1]?.content ?? ''

    const chat = model.startChat({ history })
    const result = await chat.sendMessageStream(lastMessage)

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text()
            if (text) controller.enqueue(encoder.encode(text))
          }
        } finally {
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('Chat API xatosi:', error)
    const msg = error instanceof Error ? error.message : 'Xato yuz berdi'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
