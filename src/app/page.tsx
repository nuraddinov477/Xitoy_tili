'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { BookOpen, Star, TrendingUp, Award } from 'lucide-react'
import Link from 'next/link'
import NextImage from 'next/image'

const topics = [
  {
    id: 1, zh: '问候语', uz: 'Salomlashish', en: 'Greetings',
    emoji: '👋', color: 'from-violet-600 to-purple-800',
    glow: 'rgba(139,92,246,0.6)', hsk: 1, words: 45,
    example: '你好！(Salom!)', desc: 'Asosiy salomlashish iboralari',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80',
  },
  {
    id: 2, zh: '家庭', uz: 'Oila', en: 'Family',
    emoji: '👨‍👩‍👧‍👦', color: 'from-pink-600 to-rose-800',
    glow: 'rgba(236,72,153,0.6)', hsk: 1, words: 38,
    example: '爸爸妈妈 (Ota-ona)', desc: 'Oila a\'zolari nomlari',
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1200&q=80',
  },
  {
    id: 3, zh: '饮食', uz: 'Ovqat & Ichimlik', en: 'Food & Drinks',
    emoji: '🍜', color: 'from-orange-500 to-red-700',
    glow: 'rgba(249,115,22,0.6)', hsk: 1, words: 62,
    example: '好吃！(Mazali!)', desc: 'Taomlar va ichimliklar',
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=1200&q=80',
  },
  {
    id: 4, zh: '购物', uz: 'Xarid qilish', en: 'Shopping',
    emoji: '🛍️', color: 'from-emerald-500 to-teal-700',
    glow: 'rgba(16,185,129,0.6)', hsk: 1, words: 55,
    example: '多少钱？(Qancha?)', desc: 'Bozor va do\'kon lug\'ati',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80',
  },
  {
    id: 5, zh: '交通', uz: 'Transport', en: 'Transportation',
    emoji: '🚌', color: 'from-blue-500 to-indigo-700',
    glow: 'rgba(59,130,246,0.6)', hsk: 1, words: 48,
    example: '地铁 (Metro)', desc: 'Shahar transporti',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80',
  },
  {
    id: 6, zh: '天气', uz: 'Ob-havo', en: 'Weather',
    emoji: '⛅', color: 'from-cyan-500 to-blue-700',
    glow: 'rgba(6,182,212,0.6)', hsk: 1, words: 35,
    example: '今天很热 (Bugun issiq)', desc: 'Ob-havo ta\'riflari',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=1200&q=80',
  },
  {
    id: 7, zh: '时间', uz: 'Vaqt', en: 'Time & Numbers',
    emoji: '⏰', color: 'from-yellow-500 to-amber-700',
    glow: 'rgba(234,179,8,0.6)', hsk: 1, words: 70,
    example: '几点了？(Soat necha?)', desc: 'Vaqt va raqamlar',
    image: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=1200&q=80',
  },
  {
    id: 8, zh: '颜色', uz: 'Ranglar', en: 'Colors',
    emoji: '🎨', color: 'from-fuchsia-500 to-pink-700',
    glow: 'rgba(217,70,239,0.6)', hsk: 1, words: 28,
    example: '红色 (Qizil)', desc: 'Asosiy ranglar lug\'ati',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80',
  },
  {
    id: 9, zh: '身体健康', uz: 'Salomatlik', en: 'Health & Body',
    emoji: '💪', color: 'from-lime-500 to-green-700',
    glow: 'rgba(132,204,22,0.6)', hsk: 1, words: 82,
    example: '我头疼 (Boshim og\'riydi)', desc: 'Salomatlik va tana a\'zolari',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
  },
  {
    id: 10, zh: '学习', uz: "Ta'lim", en: 'School & Study',
    emoji: '📚', color: 'from-sky-500 to-blue-700',
    glow: 'rgba(14,165,233,0.6)', hsk: 1, words: 65,
    example: '学校 (Maktab)', desc: "Ta'lim va o'qish",
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80',
  },
  {
    id: 11, zh: '工作', uz: 'Ish & Kasb', en: 'Work & Career',
    emoji: '💼', color: 'from-slate-500 to-gray-700',
    glow: 'rgba(100,116,139,0.6)', hsk: 1, words: 90,
    example: '我是医生 (Men shifokorman)', desc: 'Kasb-kor va ish joyi',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
  },
  {
    id: 12, zh: '爱好', uz: 'Hobbi', en: 'Hobbies',
    emoji: '🎯', color: 'from-red-500 to-orange-700',
    glow: 'rgba(239,68,68,0.6)', hsk: 1, words: 50,
    example: '我喜欢音乐 (Musiqa yoqadi)', desc: 'Qiziqishlar va hobblar',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80',
  },
  {
    id: 13, zh: '旅行', uz: 'Sayohat', en: 'Travel',
    emoji: '✈️', color: 'from-teal-500 to-cyan-700',
    glow: 'rgba(20,184,166,0.6)', hsk: 1, words: 75,
    example: '我去北京 (Pekinga boraman)', desc: 'Sayohat va turizm',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1200&q=80',
  },
  {
    id: 14, zh: '动物', uz: 'Hayvonlar', en: 'Animals',
    emoji: '🐼', color: 'from-indigo-500 to-purple-700',
    glow: 'rgba(99,102,241,0.6)', hsk: 1, words: 42,
    example: '熊猫 (Panda)', desc: "Hayvonot olami lug'ati",
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=1200&q=80',
  },
  {
    id: 15, zh: '自然', uz: 'Tabiat', en: 'Nature',
    emoji: '🌿', color: 'from-green-500 to-emerald-700',
    glow: 'rgba(34,197,94,0.6)', hsk: 1, words: 58,
    example: '山和河 (Tog\' va daryo)', desc: 'Tabiat va muhit',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  },
  // HSK 2
  {
    id: 20, zh: '日常生活', uz: 'Kundalik hayot', en: 'Daily Routine',
    emoji: '🌅', color: 'from-amber-500 to-orange-700',
    glow: 'rgba(245,158,11,0.6)', hsk: 2, words: 60,
    example: '几点起床？(Soat nechada turasiz?)', desc: 'Kun tartibi va odatlar',
    image: 'https://images.unsplash.com/photo-1484627147104-f5197bcd6651?w=1200&q=80',
  },
  {
    id: 16, zh: '运动锻炼', uz: 'Sport va mashq', en: 'Sports & Exercise',
    emoji: '🏃', color: 'from-green-500 to-emerald-700',
    glow: 'rgba(16,185,129,0.6)', hsk: 2, words: 60,
    example: '我每天跑步 (Har kuni yuguraman)', desc: 'Sport turlari va mashqlar',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80',
  },
  {
    id: 17, zh: '身体健康', uz: "Sog'liq va kasallik", en: 'Health & Illness',
    emoji: '🏥', color: 'from-blue-500 to-cyan-700',
    glow: 'rgba(59,130,246,0.6)', hsk: 2, words: 60,
    example: '我感冒了 (Shamolladim)', desc: "Shifokorga borish va sog'liq",
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80',
  },
  {
    id: 18, zh: '比较与购物', uz: 'Taqqoslash va xarid', en: 'Comparison & Shopping',
    emoji: '🛍️', color: 'from-pink-500 to-fuchsia-700',
    glow: 'rgba(236,72,153,0.6)', hsk: 2, words: 60,
    example: '这个比那个贵 (Bu naridan qimmat)', desc: 'Narx taqqoslash va savdo',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80',
  },
  {
    id: 19, zh: '交通出行', uz: 'Transport va yo\'l', en: 'Transport & Travel',
    emoji: '🚇', color: 'from-violet-500 to-purple-700',
    glow: 'rgba(139,92,246,0.6)', hsk: 2, words: 60,
    example: '坐地铁去 (Metroda borish)', desc: 'Metro, avtobus va yo\'l so\'rash',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80',
  },
]

const CHINESE_CHARS = '你好谢再见学习工作家庭饮食购物交通天气时间颜色健康旅行动物自然爱好汉语中文老师学生朋友爸妈哥姐弟妹人口有几岁年月日时分秒'

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 5 ta rang sxemasi: [bright, mid, dim, bgFade]
    const colorSchemes = [
      { bright: '#ff6666', mid: '#cc0000', dim: '#440000', bg: 'rgba(26,5,5,0.06)' },    // Qizil
      { bright: '#ff88cc', mid: '#dd2277', dim: '#550033', bg: 'rgba(26,5,15,0.06)' },   // Pushti
      { bright: '#66ff88', mid: '#00cc44', dim: '#004422', bg: 'rgba(5,26,10,0.06)' },   // Yashil
      { bright: '#ffee44', mid: '#ccaa00', dim: '#443300', bg: 'rgba(26,22,5,0.06)' },   // Sariq
      { bright: '#66aaff', mid: '#0055cc', dim: '#001144', bg: 'rgba(5,10,26,0.06)' },   // Ko'k
    ]

    let schemeIndex = 0
    let schemeTimer = 0
    const SCHEME_INTERVAL = 12000 // 12 soniya

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const fontSize = 18
    const cols = Math.floor(window.innerWidth / fontSize)
    const drops: number[] = Array(cols).fill(1)

    ctx.font = `${fontSize}px monospace`

    let lastTime = 0
    let rafId = 0

    const draw = (timestamp: number) => {
      rafId = requestAnimationFrame(draw)
      if (timestamp - lastTime < 100) return // max 10fps
      lastTime = timestamp

      schemeTimer += 100
      if (schemeTimer >= SCHEME_INTERVAL) {
        schemeTimer = 0
        schemeIndex = (schemeIndex + 1) % colorSchemes.length
      }

      const scheme = colorSchemes[schemeIndex]
      ctx.fillStyle = scheme.bg
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < drops.length; i++) {
        const char = CHINESE_CHARS[Math.floor(Math.random() * CHINESE_CHARS.length)]
        const y = drops[i] * fontSize
        const brightness = Math.random()
        ctx.fillStyle = brightness > 0.95 ? '#ffffff' : brightness > 0.65 ? scheme.bright : scheme.mid
        ctx.fillText(char, i * fontSize, y)
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
    }

    rafId = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const totalWords = topics.reduce((sum, t) => sum + t.words, 0)
  const [showAbout, setShowAbout] = useState(false)

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Static dark background */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1, background: 'linear-gradient(135deg, #1a0505 0%, #0a0a0a 50%, #200808 100%)' }} />

      {/* Matrix canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0, opacity: 0.55 }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-8 py-12" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        {/* Header */}
        <motion.div
          className="text-center"
          style={{ marginBottom: '7rem' }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-7xl">🀄</span>
          </motion.div>

          <h1 className="chinese-font text-6xl md:text-8xl font-black mb-4 shimmer-text">
            中文学习
          </h1>
          <p className="text-2xl md:text-3xl text-white font-bold mb-2">
            Xitoy tili HSK Mavzulari
          </p>
          <p className="text-gray-400 text-lg">
            15 ta asosiy mavzu • Interaktiv o&apos;rganish
          </p>

          {/* Stats bar */}
          <motion.div
            className="flex justify-center gap-8 mt-10 flex-wrap"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {[
              { icon: BookOpen, label: 'Mavzular', value: '20' },
              { icon: Star, label: "So'zlar", value: `${totalWords}+` },
              { icon: TrendingUp, label: 'HSK Darajalari', value: '1-2' },
              { icon: Award, label: 'Namunalar', value: '20' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center gap-1 px-6 py-3 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                }}
                whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
              >
                <stat.icon className="text-purple-400 w-5 h-5" />
                <span className="text-white font-bold text-xl">{stat.value}</span>
                <span className="text-gray-400 text-xs">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ═══ MEN HAQIMDA TUGMA ═══ */}
        <motion.div
          className="flex justify-center"
          style={{ marginBottom: '6rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.button
            onClick={() => setShowAbout(true)}
            className="group flex items-center gap-4 px-8 py-4 rounded-2xl cursor-pointer transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(220,38,38,0.25)',
              backdropFilter: 'blur(10px)',
            }}
            whileHover={{ scale: 1.03, borderColor: 'rgba(220,38,38,0.6)', background: 'rgba(220,38,38,0.08)' }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0" style={{ border: '2px solid rgba(220,38,38,0.4)' }}>
              <NextImage src="/avatar.jpg" alt="Sarvarbek" width={48} height={48} className="w-full h-full object-cover"/>
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-base">Nuraddinov Sarvarbek</p>
              <p className="text-red-400 text-sm">Men haqimda →</p>
            </div>
          </motion.button>
        </motion.div>

        {/* ═══ MEN HAQIMDA MODAL ═══ */}
        {showAbout && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowAbout(false)}
          >
            <motion.div
              className="relative w-full overflow-y-auto rounded-3xl"
              style={{
                maxWidth: '580px',
                maxHeight: '90vh',
                background: 'linear-gradient(160deg, #120808 0%, #08081a 100%)',
                border: '1px solid rgba(220,38,38,0.3)',
                boxShadow: '0 30px 100px rgba(0,0,0,0.8), 0 0 80px rgba(220,38,38,0.1)',
              }}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Top gradient line */}
              <div className="h-[3px] w-full bg-gradient-to-r from-red-700 via-rose-300 to-violet-600 rounded-t-3xl"/>

              {/* Close button */}
              <button
                onClick={() => setShowAbout(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors z-10"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                ✕
              </button>

              <div className="px-8 pt-10 pb-8 space-y-7">
                {/* Avatar + name */}
                <div className="flex items-center gap-6">
                  <div className="relative flex-shrink-0">
                    <motion.div
                      className="w-24 h-24 rounded-full overflow-hidden"
                      style={{ border: '3px solid rgba(220,38,38,0.5)' }}
                      animate={{ boxShadow: ['0 0 20px rgba(220,38,38,0.2)', '0 0 50px rgba(220,38,38,0.45)', '0 0 20px rgba(220,38,38,0.2)'] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <NextImage src="/avatar.jpg" alt="Sarvarbek Nuraddinov" width={96} height={96} className="w-full h-full object-cover"/>
                    </motion.div>
                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-[#120808]"/>
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white leading-tight">Nuraddinov Sarvarbek</h2>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"/>
                      <p className="text-red-400 font-semibold text-sm">ML Engineer & Web Developer</p>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">📍 Toshkent, O&apos;zbekiston</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }}/>

                {/* Ta'lim */}
                <div className="rounded-2xl px-5 py-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">🎓 Ta&apos;lim</p>
                  <p className="text-white font-semibold text-sm mb-1">Toshkent Davlat Sharqshunoslik Universiteti</p>
                  <p className="text-gray-400 text-sm mb-3">Kompyuter Lingvistikasi · 2-kurs talabasi</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Sharq tillari, xususan xitoy tili va sun&apos;iy intellekt texnologiyalari kesishmasida ilm olmoqdaman. Lingvistika va dasturlashni birlashtirgan yo&apos;nalish bo&apos;yicha chuqur bilim egallashga intilyapman.
                  </p>
                </div>

                {/* Oila */}
                <div className="rounded-2xl px-5 py-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">👨‍👩‍👦‍👦 Oilamiz</p>
                  <p className="text-gray-300 text-sm leading-[1.8]">
                    Oilamizda <span className="text-white font-bold">5 kishi</span> yashaydi —{' '}
                    <span className="text-red-300 font-medium">dadam</span>,{' '}
                    <span className="text-red-300 font-medium">oyim</span>,{' '}
                    men va ikkita ukam.
                  </p>
                  <div className="mt-4 space-y-2.5">
                    <div className="flex items-start gap-3">
                      <span className="text-base mt-0.5">👦</span>
                      <div>
                        <p className="text-white text-sm font-medium">Katta ukam</p>
                        <p className="text-gray-400 text-xs mt-0.5">Toshkent Arxitektura va Qurilish Universitetida tahsil olmoqda</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-base mt-0.5">👦</span>
                      <div>
                        <p className="text-white text-sm font-medium">Kichik ukam</p>
                        <p className="text-gray-400 text-xs mt-0.5">Xorazm — Jaloliddin Manguberdi Harbiy Akademik Litseyi talabasi</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Qiziqishlar */}
                <div className="rounded-2xl px-5 py-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">✨ Qiziqishlarim</p>
                  <div className="flex flex-wrap gap-2">
                    {['🤖 Sun\'iy intellekt', '💻 Web dasturlash', '🀄 Xitoy tili', '📚 Kitob o\'qish', '🎵 Musiqa', '🌏 Sayohat'].map(item => (
                      <span key={item} className="text-xs px-3 py-1.5 rounded-full font-medium"
                        style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.22)', color: '#fca5a5' }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Portfolio link */}
                <div className="rounded-2xl px-5 py-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    Men haqimda to&apos;liqroq ma&apos;lumot olmoqchi bo&apos;lsangiz yoki men bilan hamkorlik qilmoqchi bo&apos;lsangiz, quyidagi link orqali shaxsiy saytimga o&apos;tib o&apos;zingizga kerakli ma&apos;lumotni olishingiz mumkin.
                  </p>
                  <a
                    href="https://nuraddinov-uz.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-3.5 rounded-2xl font-bold text-white transition-all hover:scale-[1.02]"
                    style={{
                      background: 'linear-gradient(135deg, rgba(220,38,38,0.35), rgba(109,40,217,0.25))',
                      border: '1px solid rgba(220,38,38,0.4)',
                      boxShadow: '0 8px 30px rgba(220,38,38,0.18)',
                    }}
                  >
                    🌐 <span>nuraddinov-uz.vercel.app</span> <span className="text-red-300">↗</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Section divider */}
        <motion.div
          className="text-center"
          style={{ marginBottom: '5rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="inline-flex items-center gap-4 mb-3">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-red-500/60"/>
            <span className="chinese-font text-red-400 text-3xl font-black">课程</span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-red-500/60"/>
          </div>
          <p className="text-gray-500 text-xs tracking-[0.3em] uppercase">HSK 1–2 • 20 ta Mavzu</p>
        </motion.div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {topics.map((topic, index) => (
            <Link href={`/topic/${topic.id}`} key={topic.id} className="block">
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.6,
                  type: 'spring',
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.97 }}
                onHoverStart={() => setHoveredCard(topic.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="cursor-pointer relative h-full"
              >
                {/* Card */}
                <div
                  className="relative rounded-2xl overflow-hidden h-full"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: hoveredCard === topic.id
                      ? `0 20px 60px ${topic.glow}, 0 0 40px ${topic.glow}`
                      : '0 4px 20px rgba(0,0,0,0.3)',
                    transition: 'box-shadow 0.3s ease',
                  }}
                >
                  {/* Background image */}
                  <div className="absolute inset-0 opacity-20 overflow-hidden rounded-2xl">
                    <img src={topic.image} alt={topic.uz} className="w-full h-full object-cover" />
                  </div>

                  {/* Gradient top bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${topic.color}`} />

                  {/* Animated background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0`}
                    animate={{ opacity: hoveredCard === topic.id ? 0.08 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="p-5 relative z-10">
                    {/* Number badge */}
                    <div className="absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white z-20"
                      style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)' }}>
                      {index + 1}
                    </div>

                    {/* Header row */}
                    <div className="flex items-start justify-between mb-3 mt-4">
                      <motion.div
                        className="text-4xl"
                        animate={hoveredCard === topic.id
                          ? { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }
                          : { rotate: 0, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {topic.emoji}
                      </motion.div>
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className={`text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r ${topic.color} text-white`}
                        >
                          HSK {topic.hsk}
                        </span>
                        <span className="text-xs text-gray-400">{topic.words} so&apos;z</span>
                      </div>
                    </div>

                    {/* Chinese characters */}
                    <motion.h2
                      className="chinese-font text-4xl font-black text-white mb-1 leading-tight"
                      animate={hoveredCard === topic.id
                        ? { textShadow: `0 0 20px ${topic.glow}` }
                        : { textShadow: 'none' }}
                    >
                      {topic.zh}
                    </motion.h2>

                    {/* Uzbek name */}
                    <p className="text-lg font-semibold text-gray-200 mb-1">{topic.uz}</p>
                    <p className="text-xs text-gray-400 mb-3">{topic.desc}</p>

                    {/* Example */}
                    <motion.div
                      className="rounded-xl p-3"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                      animate={hoveredCard === topic.id
                        ? { background: 'rgba(255,255,255,0.08)' }
                        : { background: 'rgba(255,255,255,0.05)' }}
                    >
                      <p className="text-xs text-gray-400 mb-1">Namuna:</p>
                      <p className="text-sm text-white font-medium">{topic.example}</p>
                    </motion.div>

                    {/* Progress bar */}
                    <div className="mt-3">
                      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${topic.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(topic.words / 90) * 100}%` }}
                          transition={{ delay: index * 0.08 + 0.5, duration: 1, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Corner decoration */}
                  <motion.div
                    className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl ${topic.color} opacity-10 rounded-tl-full`}
                    animate={hoveredCard === topic.id
                      ? { opacity: 0.2, scale: 1.2 }
                      : { opacity: 0.1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="text-center mt-10 pb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="chinese-font text-5xl text-white/10 font-black mb-4">
            加油！💪 努力学习！
          </div>
          <p className="text-gray-500 text-sm">Xitoy tilini o&apos;rganishda muvaffaqiyat! · Made by <a href="https://nuraddinov-uz.vercel.app" target="_blank" className="text-red-500 hover:text-red-400 transition-colors font-bold">Sarvarbek Nuraddinov</a></p>
        </motion.div>
      </div>
    </div>
  )
}
