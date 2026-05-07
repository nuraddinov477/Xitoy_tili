'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { BookOpen, Star, TrendingUp, Award } from 'lucide-react'
import Link from 'next/link'
import NextImage from 'next/image'

const topics = [
  {
    id: 1, zh: '你好', uz: 'Salom', en: 'Hello',
    emoji: '👋', color: 'from-violet-600 to-purple-800',
    glow: 'rgba(139,92,246,0.6)', hsk: 1, words: 10,
    example: '你好！(Salom!)', desc: 'Salomlashish va birinchi tanishuv',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80',
  },
  {
    id: 2, zh: '谢谢你', uz: 'Rahmat', en: 'Thank you',
    emoji: '🙏', color: 'from-pink-600 to-rose-800',
    glow: 'rgba(236,72,153,0.6)', hsk: 1, words: 10,
    example: '谢谢你！(Rahmat!)', desc: 'Minnatdorchilik va xayrlashish',
    image: 'https://images.unsplash.com/photo-1494806812796-244fe51b774d?w=1200&q=80',
  },
  {
    id: 3, zh: '你叫什么名字', uz: 'Ismingiz nima?', en: "What's your name",
    emoji: '🪪', color: 'from-orange-500 to-red-700',
    glow: 'rgba(249,115,22,0.6)', hsk: 1, words: 12,
    example: '你叫什么名字？(Ismingiz nima?)', desc: '"什么", "是" va "吗" so\'roq shakllari',
    image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&q=80',
  },
  {
    id: 4, zh: '她是我的汉语老师', uz: 'U mening xitoy tili o\'qituvchim', en: 'She is my Chinese teacher',
    emoji: '👩‍🏫', color: 'from-emerald-500 to-teal-700',
    glow: 'rgba(16,185,129,0.6)', hsk: 1, words: 12,
    example: '她是我的汉语老师 (U xitoy tili o\'qituvchim)', desc: '"谁", "哪", "的", "呢" qoidalari',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80',
  },
  {
    id: 5, zh: '她女儿今年二十岁', uz: 'Uning qizi yigirma yoshda', en: 'Her daughter is 20',
    emoji: '👩', color: 'from-blue-500 to-indigo-700',
    glow: 'rgba(59,130,246,0.6)', hsk: 1, words: 12,
    example: '她女儿今年二十岁 (Qizi 20 yoshda)', desc: 'Yosh, "几", 100 gacha sonlar, "了"',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80',
  },
  {
    id: 6, zh: '我会说汉语', uz: 'Men xitoycha gapira olaman', en: 'I can speak Chinese',
    emoji: '🗣️', color: 'from-cyan-500 to-blue-700',
    glow: 'rgba(6,182,212,0.6)', hsk: 1, words: 12,
    example: '我会说汉语 (Xitoycha gapiraman)', desc: 'Yordamchi fe\'l "会", sifat predikati',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1200&q=80',
  },
  {
    id: 7, zh: '今天几号', uz: 'Bugun necha sana?', en: "What's today's date",
    emoji: '📅', color: 'from-yellow-500 to-amber-700',
    glow: 'rgba(234,179,8,0.6)', hsk: 1, words: 12,
    example: '今天几号？(Bugun necha sana?)', desc: 'Sanalar, hafta kunlari, ketma-ket fe\'l gap',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&q=80',
  },
  {
    id: 8, zh: '我想喝茶', uz: 'Choy ichmoqchiman', en: "I'd like some tea",
    emoji: '🍵', color: 'from-fuchsia-500 to-pink-700',
    glow: 'rgba(217,70,239,0.6)', hsk: 1, words: 14,
    example: '我想喝茶 (Choy ichmoqchiman)', desc: '"想", "多少", "个", pul ifodasi',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1200&q=80',
  },
  {
    id: 9, zh: '你儿子在哪儿工作', uz: 'O\'g\'lingiz qayerda ishlaydi?', en: 'Where does your son work',
    emoji: '🏥', color: 'from-lime-500 to-green-700',
    glow: 'rgba(132,204,22,0.6)', hsk: 1, words: 12,
    example: '你儿子在哪儿工作？(O\'g\'lingiz qayerda ishlaydi?)', desc: 'Fe\'l "在", "哪儿", predlog "在"',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
  },
  {
    id: 10, zh: '我能坐这儿吗', uz: 'Bu yerda o\'tirsam bo\'ladimi?', en: 'Can I sit here',
    emoji: '🪑', color: 'from-sky-500 to-blue-700',
    glow: 'rgba(14,165,233,0.6)', hsk: 1, words: 12,
    example: '我能坐这儿吗？(O\'tirsam bo\'ladimi?)', desc: '"有" gap, "和", "能", "请" iltimos',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
  },
  {
    id: 11, zh: '现在几点', uz: 'Hozir soat necha?', en: "What's the time now",
    emoji: '⏰', color: 'from-slate-500 to-gray-700',
    glow: 'rgba(100,116,139,0.6)', hsk: 1, words: 10,
    example: '现在几点？(Soat necha?)', desc: 'Soat ifodasi, vaqt ravishi, "前"',
    image: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=1200&q=80',
  },
  {
    id: 12, zh: '明天天气怎么样', uz: 'Ertaga ob-havo qanday?', en: "How's tomorrow's weather",
    emoji: '⛅', color: 'from-red-500 to-orange-700',
    glow: 'rgba(239,68,68,0.6)', hsk: 1, words: 12,
    example: '明天天气怎么样？(Ob-havo qanday?)', desc: '"怎么样", "太", yordamchi "会" (2)',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=1200&q=80',
  },
  {
    id: 13, zh: '他在学做中国菜呢', uz: 'U xitoy taomi pishirishni o\'rganmoqda', en: "He's learning Chinese cooking",
    emoji: '🍳', color: 'from-teal-500 to-cyan-700',
    glow: 'rgba(20,184,166,0.6)', hsk: 1, words: 10,
    example: '他在学做中国菜呢 (Xitoy taomi pishiryapti)', desc: '"在...呢" davom etayotgan, "吧"',
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=1200&q=80',
  },
  {
    id: 14, zh: '她买了不少衣服', uz: 'U ko\'p kiyim sotib oldi', en: 'She bought lots of clothes',
    emoji: '🛍️', color: 'from-indigo-500 to-purple-700',
    glow: 'rgba(99,102,241,0.6)', hsk: 1, words: 12,
    example: '她买了不少衣服 (Ko\'p kiyim oldi)', desc: '"了" o\'tgan zamon, "都", "啊"',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80',
  },
  {
    id: 15, zh: '我是坐飞机来的', uz: 'Men samolyotda kelganman', en: 'I came here by plane',
    emoji: '✈️', color: 'from-green-500 to-emerald-700',
    glow: 'rgba(34,197,94,0.6)', hsk: 1, words: 10,
    example: '我是坐飞机来的 (Samolyotda keldim)', desc: '"是...的" gap, sana ifodasi (2)',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80',
  },
  // HSK 2
  {
    id: 16, zh: '九月去北京旅游最好', uz: 'Pekinga sayohat', en: 'Travel to Beijing',
    emoji: '✈️', color: 'from-sky-500 to-blue-700',
    glow: 'rgba(14,165,233,0.6)', hsk: 2, words: 18,
    example: '九月去北京旅游最好 (Sentabr eng yaxshi)', desc: 'Sayohat va oylar',
    image: 'https://images.unsplash.com/photo-1508804052814-cd3ba865a116?w=1200&q=80',
  },
  {
    id: 17, zh: '我每天六点起床', uz: 'Kundalik tartib', en: 'Daily Routine',
    emoji: '⏰', color: 'from-orange-500 to-amber-700',
    glow: 'rgba(249,115,22,0.6)', hsk: 2, words: 18,
    example: '我每天六点起床 (Har kuni 6da turaman)', desc: 'Kun tartibi va vaqt',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  },
  {
    id: 18, zh: '左边那个红色的是我的', uz: 'Ranglar va joy', en: 'Colors & Position',
    emoji: '🎨', color: 'from-pink-500 to-fuchsia-700',
    glow: 'rgba(236,72,153,0.6)', hsk: 2, words: 15,
    example: '左边那个红色的是我的 (Chap qizil rangli — meniki)', desc: 'Ranglar va joy ko\'rsatkichi',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&q=80',
  },
  {
    id: 19, zh: '这个工作是他帮我介绍的', uz: 'Ish tanishtirish', en: 'Job Introduction',
    emoji: '💼', color: 'from-violet-500 to-purple-700',
    glow: 'rgba(139,92,246,0.6)', hsk: 2, words: 12,
    example: '这个工作是他帮我介绍的 (Ishni u tanishtirgan)', desc: '是…的 ta\'kidi',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80',
  },
  {
    id: 20, zh: '我想买条厚一点儿的', uz: 'Kiyim tanlash', en: 'Choosing Clothes',
    emoji: '👖', color: 'from-amber-500 to-orange-700',
    glow: 'rgba(245,158,11,0.6)', hsk: 2, words: 15,
    example: '我想买条厚一点儿的 (Qalinroqini olmoqchiman)', desc: '一点儿, 又…又…',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80',
  },
  {
    id: 21, zh: '你怎么不吃了', uz: 'Sog\'lik va ovqat', en: 'Health & Eating',
    emoji: '🍽️', color: 'from-rose-500 to-red-700',
    glow: 'rgba(244,63,94,0.6)', hsk: 2, words: 12,
    example: '你怎么不吃了？(Nimaga endi yemayapsan?)', desc: '怎么 + V, 不…了',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
  },
  {
    id: 22, zh: '你家离公司远吗', uz: 'Masofa va transport', en: 'Distance & Transport',
    emoji: '🏢', color: 'from-fuchsia-500 to-pink-700',
    glow: 'rgba(217,70,239,0.6)', hsk: 2, words: 12,
    example: '你家离公司远吗？(Uyingiz uzoqmi?)', desc: '离, 从…到…',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
  },
  {
    id: 23, zh: '让我想想再告诉你', uz: 'Mulohaza qilish', en: 'Thinking & Deciding',
    emoji: '🤔', color: 'from-amber-600 to-yellow-700',
    glow: 'rgba(217,119,6,0.6)', hsk: 2, words: 12,
    example: '让我想想再告诉你 (O\'ylab keyin aytaman)', desc: 'V V, 让, 再',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200&q=80',
  },
  {
    id: 24, zh: '题太多我没做完', uz: 'Imtihon va vazifa', en: 'Exams & Homework',
    emoji: '📝', color: 'from-cyan-500 to-blue-700',
    glow: 'rgba(6,182,212,0.6)', hsk: 2, words: 12,
    example: '题太多，我没做完 (Savol ko\'p, ulgurmadim)', desc: 'V+完, 太…了',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80',
  },
  {
    id: 25, zh: '别找了手机在桌子上呢', uz: 'Narsa joylashuvi', en: 'Object Location',
    emoji: '📱', color: 'from-orange-500 to-red-600',
    glow: 'rgba(249,115,22,0.6)', hsk: 2, words: 12,
    example: '别找了，手机在桌子上呢 (Izlama, stolda)', desc: 'V着, 别, 呢',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=80',
  },
  {
    id: 26, zh: '他比我大三岁', uz: 'Taqqoslash', en: 'Comparison',
    emoji: '⚖️', color: 'from-emerald-500 to-green-700',
    glow: 'rgba(16,185,129,0.6)', hsk: 2, words: 12,
    example: '他比我大三岁 (U mendan 3 yosh katta)', desc: '比, 没有…那么',
    image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&q=80',
  },
  {
    id: 27, zh: '你穿得太少了', uz: 'Daraja to\'ldiruvchisi', en: 'Degree Complement',
    emoji: '🧥', color: 'from-indigo-500 to-blue-700',
    glow: 'rgba(99,102,241,0.6)', hsk: 2, words: 12,
    example: '你穿得太少了 (Yengil kiyinibsan)', desc: 'V得 + sifat',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=1200&q=80',
  },
  {
    id: 28, zh: '门开着呢', uz: 'Davom etayotgan holat', en: 'Continuing State',
    emoji: '🚪', color: 'from-pink-500 to-rose-700',
    glow: 'rgba(236,72,153,0.6)', hsk: 2, words: 12,
    example: '门开着呢 (Eshik ochiq)', desc: 'V着, 一边…一边…',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80',
  },
  {
    id: 29, zh: '你看过那个电影吗', uz: 'Tajriba haqida', en: 'Past Experience',
    emoji: '🎬', color: 'from-lime-500 to-green-700',
    glow: 'rgba(132,204,22,0.6)', hsk: 2, words: 12,
    example: '你看过那个电影吗？(Kinoni ko\'rganmisan?)', desc: 'V过, 听说',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80',
  },
  {
    id: 30, zh: '新年就要到了', uz: 'Yangi yil keladi', en: 'New Year is coming',
    emoji: '🎉', color: 'from-red-500 to-rose-700',
    glow: 'rgba(239,68,68,0.6)', hsk: 2, words: 12,
    example: '新年就要到了 (Yangi yil yaqin)', desc: '要…了, 越来越',
    image: 'https://images.unsplash.com/photo-1546271876-af6caec5fae4?w=1200&q=80',
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

      <div className="relative z-10 max-w-5xl mx-auto px-8 pt-12" style={{ marginLeft: 'auto', marginRight: 'auto', paddingBottom: '6rem' }}>
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
          <p className="text-2xl md:text-4xl text-white font-black mb-2 uppercase tracking-widest">
            Nuraddinov Sarvarbek
          </p>
          <p className="text-red-400 text-lg font-semibold tracking-wider">
            Portfolio
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
              <p className="text-white font-black text-base uppercase tracking-widest">Nuraddinov Sarvarbek</p>
              <p className="text-red-400 text-xs tracking-wider">Portfolio →</p>
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

      </div>

        {/* Spacer */}
        <div style={{ height: '8rem' }} />

        {/* Footer */}
        <motion.div
          className="relative z-10 text-center"
          style={{ marginTop: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="px-8 py-8"
            style={{ border: '2px solid rgba(30,58,138,0.8)', background: 'rgba(15,23,42,0.5)' }}>
            <div className="chinese-font text-5xl text-white/10 font-black mb-6">
              加油！💪 努力学习！
            </div>
            <p className="text-white font-black text-xl mb-1">Nuraddinov Sarvarbek</p>
            <p className="text-gray-400 text-sm mb-3">Toshkent Davlat Sharqshunoslik Universiteti · Kompyuter Lingvistikasi · 2-kurs</p>
            <a href="https://nuraddinov-uz.vercel.app" target="_blank" rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400 transition-colors text-sm font-semibold">
              nuraddinov-uz.vercel.app ↗
            </a>
          </div>
        </motion.div>
    </div>
  )
}
