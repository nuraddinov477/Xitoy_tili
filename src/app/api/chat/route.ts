import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

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

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'API kalit topilmadi' }, { status: 500 })
    }

    const stream = client.messages.stream({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(event.delta.text))
            }
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
    return NextResponse.json({ error: 'Xato yuz berdi' }, { status: 500 })
  }
}
