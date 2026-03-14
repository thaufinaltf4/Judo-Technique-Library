import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { techniques } from '@/data/techniques'
import type { Technique } from '@/types'

function norm(s: string) {
  return s.toLowerCase().replace(/[-\s]/g, '')
}

function getRandom(exclude?: number): Technique {
  const pool = exclude !== undefined ? techniques.filter(t => t.id !== exclude) : techniques
  if (pool.length === 0) return techniques[0]
  return pool[Math.floor(Math.random() * pool.length)]
}
async function postAttempt(techniqueId: number, userAnswer: string, isCorrect: boolean): Promise<boolean> {
  try {
    const res = await fetch('/api/quiz/attempt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ technique_id: techniqueId, user_answer: userAnswer, is_correct: isCorrect }),
    })
    return res.ok
  } catch {
    return false
  }
}

export function QuizPage() {
  const [tech, setTech] = useState<Technique>(() => getRandom())
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<'correct' | 'incorrect' | null>(null)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const submit = useCallback(async () => {
    if (!input.trim() || status) return
    const correct = input.trim().toLowerCase().replace(/[-\s]/g, '') === norm(tech.name)

    setStatus(correct ? 'correct' : 'incorrect')
    const saved = await postAttempt(tech.id, input.trim(), correct)
    if (!saved) setError('Could not save your attempt')
  }, [input, status, tech])

  const next = useCallback(() => {
    setTech(getRandom(tech.id))
    setInput('')
    setStatus(null)
    setError(null)
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [tech.id])

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') status ? next() : submit()
  }

  const videoSrc = 'https://www.youtube-nocookie.com/embed/' + tech.youtubeVideoId + '?start=' + tech.startSeconds + '&end=' + tech.endSeconds + '&autoplay=1&mute=1&rel=0&modestbranding=1&controls=0'

  if (techniques.length === 0) {
    return (
      <div className="min-h-screen bg-[#0c0a09] flex items-center justify-center">
        <p className="font-display text-3xl text-stone-700">No techniques available.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0c0a09]">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">

        <div className="border-b border-stone-800/50 py-14 sm:py-20">
          <p className="text-red-600 text-[10px] uppercase tracking-[0.28em] font-medium mb-4">
            Kodokan
          </p>
            <h1 className="font-display text-[72px] sm:text-[96px] leading-[0.9] text-stone-100">
              Name the<br />Technique
            </h1>
        </div>

        <div className="py-12 space-y-8">

        <div className="relative w-full overflow-hidden rounded-xl bg-stone-900" style={{ paddingTop: 'calc(56.25% * 0.80)' }}>
            <iframe
              key={tech.id}
            src={videoSrc}
              title="Quiz video"
              className="absolute left-0 w-full"
              style={{ height: '125%', top: '-15%' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            />
            <div className="absolute bottom-0 left-0 w-1/2 h-[18%] bg-[#0c0a09]" />
          </div>

          <div className="space-y-4">
            <input
              ref={inputRef}
              type="text"
              value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
              disabled={!!status}
              placeholder="Type the technique name..."
              autoFocus
              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-5 py-4
                         text-stone-100 text-base placeholder:text-stone-700
                         focus:outline-none focus:border-red-600/60
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-colors duration-150"
            />

            <AnimatePresence mode="wait">
              {!status ? (
                <motion.button
                  key="submit"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  onClick={submit}
                  disabled={!input.trim()}
                  className="w-full py-4 rounded-xl font-display text-[22px] tracking-wide
                             bg-red-600 text-stone-100 hover:bg-red-500
                             disabled:opacity-30 disabled:cursor-not-allowed
                             transition-colors duration-150"
                >
                  Submit
                </motion.button>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="space-y-3"
                >
                  <div className={`rounded-xl px-5 py-4 border ${
                    status === 'correct'
                      ? 'bg-emerald-950/40 border-emerald-800/50'
                      : 'bg-red-950/40 border-red-800/50'
                  }`}>
                    <p className={`text-[10px] uppercase tracking-[0.2em] font-medium mb-1 ${
                      status === 'correct' ? 'text-emerald-500' : 'text-red-500'
                    }`}>
                      {status === 'correct' ? 'Correct' : 'Incorrect'}
                    </p>
                    <p className="font-display text-3xl text-stone-100">{tech.name}</p>
                      <p className="text-stone-500 text-sm mt-0.5">{tech.jpName}</p>
                  </div>

                  {error && (
                    <p className="text-red-500 text-xs text-center">{error}</p>
                  )}

                  <button
                    onClick={next}
                    className="w-full py-4 rounded-xl font-display text-[22px] tracking-wide
                               border border-stone-700 text-stone-300 hover:border-stone-500 hover:text-stone-100
                               transition-colors duration-150"
                  >
                    Next
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>


        </div>
      </div>
    </div>
  )
}
