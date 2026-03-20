'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, use, useCallback } from 'react'
import { ArrowLeft, X, BookOpen, MessageSquare, GraduationCap, ChevronRight, Volume2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import topicsData from '@/app/data/hsk-topics.json'

type ModalType = 'vocab' | 'grammar' | 'dialogue' | null

const topicImages: Record<number, string> = {
  1: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80',
  2: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1200&q=80',
  3: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=1200&q=80',
  4: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80',
  5: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80',
  6: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=1200&q=80',
  7: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=1200&q=80',
  8: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80',
  9: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
  10: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80',
  11: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
  12: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80',
  13: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1200&q=80',
  14: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=1200&q=80',
  15: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
}

export default function TopicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const topic = topicsData.topics.find(t => t.id === parseInt(id))
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [flipped, setFlipped] = useState<number | null>(null)
  const [openGrammar, setOpenGrammar] = useState<number | null>(null)
  const [activeDialogue, setActiveDialogue] = useState(0)
  const [speaking, setSpeaking] = useState<string | null>(null)

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    if (speaking === text) { setSpeaking(null); return }
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = 'zh-CN'
    utter.rate = 0.85
    utter.onend = () => setSpeaking(null)
    utter.onerror = () => setSpeaking(null)
    setSpeaking(text)
    window.speechSynthesis.speak(utter)
  }, [speaking])

  if (!topic) return <div className="text-white p-8">Mavzu topilmadi</div>

  const imgUrl = topicImages[topic.id]

  const panels = [
    {
      id: 'vocab' as ModalType,
      label: 'Ierogliflar',
      sublabel: "So'zlar lug'ati",
      icon: BookOpen,
      emoji: '📖',
      count: topic.vocabulary.length,
      unit: "so'z",
      gradient: 'from-violet-500 to-purple-600',
      color: '#8b5cf6',
      glow: 'rgba(139,92,246,0.5)',
    },
    {
      id: 'grammar' as ModalType,
      label: 'Grammatika',
      sublabel: 'Qoidalar',
      icon: GraduationCap,
      emoji: '📐',
      count: topic.grammar.length,
      unit: 'qoida',
      gradient: 'from-blue-500 to-cyan-600',
      color: '#3b82f6',
      glow: 'rgba(59,130,246,0.5)',
    },
    {
      id: 'dialogue' as ModalType,
      label: 'Dialog',
      sublabel: 'Suhbat',
      icon: MessageSquare,
      emoji: '💬',
      count: topic.dialogues.reduce((s: number, d: {lines: unknown[]}) => s + d.lines.length, 0),
      unit: 'satr',
      gradient: 'from-pink-500 to-rose-600',
      color: '#ec4899',
      glow: 'rgba(236,72,153,0.5)',
    },
  ]

  const activePanel = panels.find(p => p.id === activeModal)

  return (
    <div className="min-h-screen bg-[#07070f] text-white">

      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div className="absolute w-[600px] h-[600px] rounded-full top-[-200px] left-[-200px]"
          style={{ background: `radial-gradient(circle, ${topic.glow.replace('0.6','0.12')} 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute w-[400px] h-[400px] rounded-full bottom-[-100px] right-[-100px]"
          style={{ background: `radial-gradient(circle, ${topic.glow.replace('0.6','0.08')} 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.3, 1], x: [0, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} />
      </div>

      {/* Top nav */}
      <motion.nav
        className="sticky top-0 z-40 px-6 py-4"
        style={{ background: 'rgba(7,7,15,0.85)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
      >
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/">
            <motion.div
              className="flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={15} className="text-gray-300" />
              <span className="text-sm text-gray-300">Orqaga</span>
            </motion.div>
          </Link>

          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-xl">{topic.emoji}</span>
            <span className="chinese-font text-lg font-bold text-white">{topic.zh}</span>
            <ChevronRight size={14} className="text-gray-600" />
            <span className="text-gray-400 text-sm truncate">{topic.uz}</span>
          </div>

          <motion.div
            className={`text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r ${topic.color} text-white flex-shrink-0`}
            animate={{ boxShadow: [`0 0 0px ${topic.glow}`, `0 0 15px ${topic.glow}`, `0 0 0px ${topic.glow}`] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            HSK {topic.hsk}
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero */}
      <div className="relative">
        <motion.div
          className="relative overflow-hidden"
          style={{ height: 'clamp(340px, 45vh, 500px)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
        >
          <Image src={imgUrl} alt={topic.uz} fill className="object-cover scale-105" priority />

          {/* Layered overlays */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(7,7,15,0.2) 0%, rgba(7,7,15,0.55) 50%, rgba(7,7,15,1) 100%)' }} />
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${topic.glow.replace('0.6','0.25')} 0%, transparent 65%)` }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(7,7,15,0.4) 0%, transparent 60%)' }} />

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{ background: topic.glow, left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 20}%` }}
              animate={{ y: [-10, 10, -10], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}

          {/* Hero content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pb-8">
            <motion.div className="text-5xl mb-4"
              animate={{ rotate: [0, -6, 6, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
              {topic.emoji}
            </motion.div>

            <motion.h1
              className="chinese-font font-black text-white leading-none mb-3"
              style={{
                fontSize: 'clamp(72px, 14vw, 140px)',
                textShadow: `0 0 60px ${topic.glow}, 0 0 120px ${topic.glow.replace('0.6','0.3')}, 0 4px 30px rgba(0,0,0,0.9)`,
              }}
              initial={{ scale: 0.4, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 70, damping: 12 }}
            >
              {topic.zh}
            </motion.h1>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col items-center gap-2"
            >
              <p className="text-2xl md:text-3xl font-bold text-white/95 tracking-wide">{topic.uz}</p>
              <div className="flex gap-3 mt-1">
                {[`${topic.vocabulary.length} so'z`, `${topic.grammar.length} qoida`, `${topic.dialogues.length} dialog`].map((t, i) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ══ Bo'limlar — Markazlashtirilgan ══ */}
        <div className="relative z-10 py-16 px-0 overflow-hidden">

          {/* Sakura / Xitoy bezak animatsiyasi */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(18)].map((_, i) => (
              <motion.div key={i}
                className="absolute text-lg select-none"
                style={{ left: `${5 + (i * 5.5) % 92}%`, top: '-30px' }}
                animate={{ y: ['0vh', '110vh'], rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)], opacity: [0, 0.9, 0.9, 0] }}
                transition={{ duration: 6 + (i % 5) * 1.5, repeat: Infinity, delay: i * 0.7, ease: 'linear' }}
              >
                {['🌸','🌺','❀','✿','🏮','⛩','🀄','☯'][i % 8]}
              </motion.div>
            ))}

            {/* Qizil xitoy chizig'i — chap */}
            <motion.div className="absolute left-0 top-0 bottom-0 w-1"
              style={{ background: 'linear-gradient(180deg, transparent, #cc0000, #ff4444, #cc0000, transparent)' }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            {/* Qizil xitoy chizig'i — o'ng */}
            <motion.div className="absolute right-0 top-0 bottom-0 w-1"
              style={{ background: 'linear-gradient(180deg, transparent, #cc0000, #ff4444, #cc0000, transparent)' }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            />
          </div>

          {/* Sarlavha */}
          <div className="text-center mb-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-3 mb-3"
            >
              <motion.div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #cc2200)' }}
                animate={{ scaleX: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              <span className="chinese-font text-red-500 text-2xl font-black">选择</span>
              <motion.div className="h-px w-16" style={{ background: 'linear-gradient(90deg, #cc2200, transparent)' }}
                animate={{ scaleX: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
            </motion.div>
            <p className="text-gray-400 text-sm tracking-widest">Bo&apos;limni tanlang</p>
          </div>

          {/* 3 ta karta — markazda */}
          <div className="flex justify-center w-full relative z-10 px-8">
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
            {panels.map((panel, i) => (
              <motion.button
                key={panel.id}
                onClick={() => setActiveModal(panel.id)}
                className="relative rounded-3xl overflow-hidden cursor-pointer w-full"
                initial={{ opacity: 0, y: 60, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.15, type: 'spring', stiffness: 80 }}
                whileHover={{ y: -12, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  background: 'rgba(10,5,5,0.7)',
                  border: '1px solid rgba(200,0,0,0.25)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 12px 50px rgba(0,0,0,0.6)',
                  minHeight: '320px',
                }}
              >
                {/* Qizil glow hover */}
                <motion.div className="absolute inset-0"
                  style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(180,0,0,0.2) 0%, transparent 70%)' }}
                  initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} />

                {/* Yuqori qizil chiziq */}
                <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, transparent, #cc0000, #ff6644, #cc0000, transparent)' }} />

                {/* Burchak bezak */}
                <div className="absolute top-3 right-4 chinese-font text-red-900/40 text-5xl font-black select-none">福</div>
                <div className="absolute bottom-3 left-4 chinese-font text-red-900/30 text-4xl font-black select-none">龙</div>

                <div className="p-9 relative z-10 text-center flex flex-col items-center justify-center h-full">
                  {/* Lantern icon */}
                  <motion.div
                    className="w-28 h-28 rounded-full flex items-center justify-center text-5xl mx-auto mb-6"
                    style={{
                      background: `linear-gradient(135deg, rgba(180,0,0,0.35), rgba(80,0,0,0.2))`,
                      border: '2px solid rgba(200,30,30,0.45)',
                      boxShadow: '0 0 30px rgba(180,0,0,0.35)',
                    }}
                    animate={{ boxShadow: ['0 0 20px rgba(180,0,0,0.2)', '0 0 45px rgba(180,0,0,0.6)', '0 0 20px rgba(180,0,0,0.2)'] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                    whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                  >
                    {panel.emoji}
                  </motion.div>

                  <h3 className="text-3xl font-black text-white mb-1">{panel.label}</h3>
                  <p className="text-gray-500 text-sm mb-6">{panel.sublabel}</p>

                  {/* Son */}
                  <div className="flex items-center justify-center gap-2 mb-7">
                    <span className="text-5xl font-black" style={{ color: '#ff4444' }}>{panel.count}</span>
                    <span className="text-gray-400 text-base">{panel.unit}</span>
                  </div>

                  {/* Tugma */}
                  <motion.div
                    className="w-full py-3.5 rounded-xl text-white text-base font-bold"
                    style={{ background: 'linear-gradient(135deg, #cc0000, #880000)', boxShadow: '0 4px 20px rgba(180,0,0,0.45)' }}
                    whileHover={{ boxShadow: '0 6px 30px rgba(220,0,0,0.7)' }}
                  >
                    Ochish →
                  </motion.div>
                </div>

                {/* Pastki qizil chiziq */}
                <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, transparent, #cc0000, transparent)' }} />
              </motion.button>
            ))}
          </div>
        </div>
        </div>
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {activeModal && activePanel && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)' }}
                onClick={() => setActiveModal(null)}
              />

              <motion.div
                className="relative w-full max-w-2xl max-h-[88vh] rounded-3xl overflow-hidden flex flex-col"
                style={{
                  background: 'rgba(12,12,22,0.98)',
                  border: `1px solid ${activePanel.glow.replace('0.5','0.25')}`,
                  boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 40px 100px ${activePanel.glow.replace('0.5','0.4')}`,
                }}
                initial={{ scale: 0.75, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.75, opacity: 0, y: 40 }}
                transition={{ type: 'spring', stiffness: 220, damping: 28 }}
              >
                {/* Modal header */}
                <div className={`flex items-center gap-3 px-6 py-4 bg-gradient-to-r ${activePanel.gradient} flex-shrink-0 relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)' }} />
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl relative z-10">
                    {activePanel.emoji}
                  </div>
                  <div className="relative z-10">
                    <div className="text-white font-bold text-lg leading-tight">{activePanel.label}</div>
                    <div className="text-white/70 text-xs">{topic.zh} — {topic.uz}</div>
                  </div>
                  <motion.button
                    className="ml-auto w-9 h-9 rounded-xl flex items-center justify-center bg-black/20 hover:bg-black/30 text-white relative z-10"
                    onClick={() => setActiveModal(null)}
                    whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={16} />
                  </motion.button>
                </div>

                {/* Modal content */}
                <div className="overflow-y-auto flex-1 p-5">

                  {/* ═══ VOCAB — 3D flip kartochkalar ═══ */}
                  {activeModal === 'vocab' && (
                    <div>
                      <p className="text-center text-gray-500 text-xs mb-4">Kartochkani bosing — ag&apos;daring 🔄</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {topic.vocabulary.map((word, i) => {
                          return (
                          <motion.div key={i}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: i * 0.05, type: 'spring', stiffness: 120 }}
                            className="cursor-pointer"
                            style={{ perspective: '1000px', height: '160px' }}
                            onClick={() => setFlipped(flipped === i ? null : i)}
                          >
                            <motion.div
                              className="relative w-full h-full"
                              style={{ transformStyle: 'preserve-3d' }}
                              animate={{ rotateY: flipped === i ? 180 : 0 }}
                              transition={{ duration: 0.55, type: 'spring', stiffness: 100 }}
                            >
                              {/* Old — rasm + xitoy belgisi */}
                              <div className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col items-center justify-end"
                                style={{ backfaceVisibility: 'hidden', border: `1px solid ${topic.glow.replace('0.6','0.4')}` }}>
                                {/* Background image */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={`https://source.unsplash.com/200x160/?${encodeURIComponent(word.en.split(',')[0].trim())}&sig=${i}`}
                                  alt={word.en}
                                  className="absolute inset-0 w-full h-full object-cover"
                                  loading="lazy"
                                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                                />
                                {/* Dark overlay */}
                                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)' }} />
                                {/* Speak button top-left */}
                                <button
                                  className="absolute top-2 left-2 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all"
                                  style={{ background: speaking === word.zh ? topic.glow.replace('0.6','0.8') : 'rgba(0,0,0,0.5)', border: `1px solid ${topic.glow.replace('0.6','0.4')}` }}
                                  onClick={(e) => { e.stopPropagation(); speak(word.zh) }}
                                >
                                  <Volume2 size={12} className={speaking === word.zh ? 'text-white' : 'text-white/70'} />
                                </button>
                                {/* Content */}
                                <div className="relative z-10 text-center pb-3 px-2 w-full">
                                  <div
                                    className="chinese-font font-black text-white leading-none"
                                    style={{ fontSize: word.zh.length > 3 ? '1.8rem' : '2.4rem', textShadow: `0 0 20px ${topic.glow}, 0 2px 8px rgba(0,0,0,0.8)` }}
                                  >
                                    {word.zh}
                                  </div>
                                  <div className="text-xs mt-1 font-bold" style={{ color: '#fb923c', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>{word.pinyin}</div>
                                </div>
                                <div className="absolute top-2 right-2 text-white/40 text-xs z-10">↻</div>
                              </div>

                              {/* Orqa — ma'no (O'zbek/Ingliz) */}
                              <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center px-3 gap-2"
                                style={{
                                  backfaceVisibility: 'hidden',
                                  transform: 'rotateY(180deg)',
                                  background: `linear-gradient(145deg, ${topic.glow.replace('0.6','0.35')}, ${topic.glow.replace('0.6','0.12')})`,
                                  border: `1px solid ${topic.glow.replace('0.6','0.5')}`,
                                }}>
                                <div className="chinese-font text-2xl font-black text-white" style={{ textShadow: `0 0 15px ${topic.glow}` }}>{word.zh}</div>
                                <div className="w-8 h-px opacity-50" style={{ background: topic.glow }} />
                                <div className="text-white font-bold text-sm text-center leading-snug">{word.uz}</div>
                                <div className="text-white/55 text-xs text-center">{word.en}</div>
                              </div>
                            </motion.div>
                          </motion.div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* ═══ GRAMMAR — Accordion ═══ */}
                  {activeModal === 'grammar' && (
                    <div className="space-y-3">
                      <p className="text-center text-gray-500 text-xs mb-4">Qoidani bosing — kengaytiring 📖</p>
                      {topic.grammar.map((rule, i) => (
                        <motion.div key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.12 }}
                          className="rounded-2xl overflow-hidden cursor-pointer"
                          style={{ border: `1px solid ${openGrammar === i ? topic.glow.replace('0.6','0.4') : 'rgba(255,255,255,0.08)'}`, transition: 'border-color 0.3s' }}
                          onClick={() => setOpenGrammar(openGrammar === i ? null : i)}
                        >
                          {/* Header */}
                          <div className="px-5 py-4 flex items-center gap-3"
                            style={{ background: openGrammar === i ? `linear-gradient(135deg, ${topic.glow.replace('0.6','0.2')}, transparent)` : 'rgba(255,255,255,0.03)' }}>
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                              style={{ background: `linear-gradient(135deg, ${topic.glow}, ${topic.glow.replace('0.6','0.4')})` }}>
                              {i + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="chinese-font text-base font-bold text-white leading-tight">{rule.pattern}</div>
                            </div>
                            <motion.div
                              animate={{ rotate: openGrammar === i ? 180 : 0 }}
                              transition={{ duration: 0.25 }}
                              className="text-gray-500 text-lg flex-shrink-0"
                            >▾</motion.div>
                          </div>

                          {/* Body */}
                          <AnimatePresence>
                            {openGrammar === i && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                style={{ overflow: 'hidden' }}
                              >
                                <div className="px-5 pb-5 pt-1 space-y-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                                  <p className="text-gray-300 text-sm leading-relaxed border-l-2 pl-3"
                                    style={{ borderColor: topic.glow }}>
                                    {rule.explanation}
                                  </p>
                                  {/* Misol box */}
                                  <div className="rounded-2xl overflow-hidden"
                                    style={{ border: `1px solid ${topic.glow.replace('0.6','0.2')}` }}>
                                    <div className="px-4 py-2 text-xs font-bold uppercase tracking-widest"
                                      style={{ background: topic.glow.replace('0.6','0.15'), color: topic.glow.replace('rgba(','').replace(', 0.6)','') === topic.glow ? '#aaa' : '#aaa' }}>
                                      📝 Misol gapi
                                    </div>
                                    <div className="p-4 space-y-2" style={{ background: 'rgba(0,0,0,0.2)' }}>
                                      <div className="chinese-font text-2xl font-black text-white" style={{ textShadow: `0 0 15px ${topic.glow}` }}>
                                        {rule.example_zh}
                                      </div>
                                      <div className="font-semibold text-sm" style={{ color: '#fb923c' }}>{rule.example_pinyin}</div>
                                      <div className="text-gray-300 text-sm">{rule.example_uz}</div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* ═══ DIALOGUE — chat ═══ */}
                  {activeModal === 'dialogue' && (
                    <div>
                      {/* Dialogue tabs */}
                      {topic.dialogues.length > 1 && (
                        <div className="flex gap-2 mb-4 px-1 overflow-x-auto pb-1">
                          {topic.dialogues.map((dlg, idx) => (
                            <button key={idx} onClick={() => setActiveDialogue(idx)}
                              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
                              style={activeDialogue === idx ? {
                                background: topic.glow.replace('0.6','0.85'),
                                color: '#fff',
                              } : {
                                background: 'rgba(255,255,255,0.07)',
                                color: 'rgba(255,255,255,0.5)',
                                border: '1px solid rgba(255,255,255,0.12)',
                              }}>
                              {idx + 1}. {dlg.title}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Chat heads */}
                      <div className="flex justify-between items-center mb-5 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-lg">🧑</div>
                          <div>
                            <div className="text-white text-sm font-bold">Wang Ming</div>
                            <div className="text-green-400 text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"/>online</div>
                          </div>
                        </div>
                        <div className="text-gray-600 text-xs chinese-font text-lg">{topic.zh}</div>
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="text-white text-sm font-bold text-right">Li Fang</div>
                            <div className="text-green-400 text-xs flex items-center gap-1 justify-end"><span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"/>online</div>
                          </div>
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                            style={{ background: topic.glow.replace('0.6','0.4') }}>👩</div>
                        </div>
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.div key={activeDialogue} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                          className="space-y-3 pb-2">
                          {topic.dialogues[activeDialogue].lines.map((line: { speaker: string; zh: string; pinyin: string; uz: string }, i: number) => (
                            <motion.div key={i}
                              initial={{ opacity: 0, y: 12, x: line.speaker === 'A' ? -15 : 15 }}
                              animate={{ opacity: 1, y: 0, x: 0 }}
                              transition={{ delay: i * 0.1, type: 'spring', stiffness: 150 }}
                              className={`flex items-end gap-2 ${line.speaker === 'B' ? 'flex-row-reverse' : ''}`}
                            >
                              {/* Avatar */}
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                                style={{ background: line.speaker === 'A' ? 'rgba(88,80,236,0.4)' : topic.glow.replace('0.6','0.4') }}>
                                {line.speaker === 'A' ? '🧑' : '👩'}
                              </div>

                              {/* Bubble */}
                              <div className="max-w-[78%] space-y-1">
                                <div className="rounded-2xl px-4 py-3 relative"
                                  style={line.speaker === 'A' ? {
                                    background: 'linear-gradient(135deg, rgba(88,80,236,0.25), rgba(88,80,236,0.1))',
                                    border: '1px solid rgba(88,80,236,0.35)',
                                    borderBottomLeftRadius: '5px',
                                  } : {
                                    background: `linear-gradient(135deg, ${topic.glow.replace('0.6','0.35')}, ${topic.glow.replace('0.6','0.15')})`,
                                    border: `1px solid ${topic.glow.replace('0.6','0.45')}`,
                                    borderBottomRightRadius: '5px',
                                  }}>
                                  <div className="chinese-font text-xl font-black text-white leading-snug pr-8">{line.zh}</div>
                                  <div className="text-xs font-bold mt-1" style={{ color: '#fb923c' }}>{line.pinyin}</div>
                                  {/* Speak button */}
                                  <button
                                    className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all"
                                    style={{ background: speaking === line.zh ? 'rgba(251,146,60,0.5)' : 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
                                    onClick={() => speak(line.zh)}
                                  >
                                    <Volume2 size={12} className={speaking === line.zh ? 'text-orange-300' : 'text-white/60'} />
                                  </button>
                                </div>
                                <div className={`text-xs text-gray-400 px-1 ${line.speaker === 'B' ? 'text-right' : 'text-left'}`}>
                                  {line.uz}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
