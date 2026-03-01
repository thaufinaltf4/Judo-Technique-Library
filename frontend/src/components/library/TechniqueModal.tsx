import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Technique } from '@/types'
import { DifficultyBadge } from './DifficultyBadge'
import { YouTubeEmbed } from './YouTubeEmbed'

interface Props {
  item: Technique | null
  onClose: () => void
}

export function TechniqueModal({ item, onClose }: Props) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [onClose])
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
    document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [item])

  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-[2px] z-40"
            onClick={onClose}
          />

            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none"
            >
            <div
              className="bg-[#111110] border border-stone-800/70 rounded-2xl w-full max-w-3xl
                         max-h-[92vh] overflow-y-auto pointer-events-auto shadow-2xl shadow-black/70"
                onClick={e => e.stopPropagation()}
            >

              <div className="relative px-6 pt-6 pb-5 border-b border-stone-800/50 overflow-hidden">
                <span className="absolute right-5 top-1/2 -translate-y-1/2 font-display text-[88px] leading-none text-stone-800/25 select-none pointer-events-none tabular-nums">
                  {('0' + item.id).slice(-2)}
                </span>

                  <div className="relative flex items-start justify-between gap-4">
                  <div>
                      <div className="flex items-center gap-2.5 mb-2">
                      <DifficultyBadge diff={item.difficulty} />
                        <span className="text-stone-600 text-[10px] uppercase tracking-[0.18em]">
                          {item.category} / {item.subcat}
                        </span>
                    </div>
                    <h2 className="font-display text-5xl sm:text-6xl text-stone-50 leading-none">
                      {item.name}
                    </h2>
                      <p className="text-stone-500 text-sm mt-2">{item.jpName}</p>
                  </div>

                  <button onClick={onClose} aria-label="Close"
                    className="shrink-0 mt-0.5 w-8 h-8 flex items-center justify-center rounded-lg
                               text-stone-600 hover:text-stone-200 hover:bg-stone-800
                               transition-colors duration-150"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>

            <div className="px-6 pt-6">
                  <YouTubeEmbed
                    videoId={item.youtubeVideoId}
                    startSeconds={item.startSeconds}
                  />
              </div>

              <div className="px-6 pt-5 pb-6 space-y-6">
                  <p className="text-stone-400 text-sm leading-relaxed border-l-2 border-stone-800 pl-4">
                  {item.desc}
                </p>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-red-600 font-medium mb-4">
                    Key Points
                  </p>
                    <ol className="space-y-4">
                    {item.keyPts.map((pt, i) => (
                        <li key={i} className="flex gap-4 items-start">
                          <span className="font-display text-[22px] leading-none text-stone-700 shrink-0 tabular-nums w-6 text-right">
                            {i + 1}
                          </span>
                        <p className="text-stone-400 text-sm leading-relaxed pt-0.5">{pt}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
