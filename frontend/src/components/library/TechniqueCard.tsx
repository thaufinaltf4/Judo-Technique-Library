import { motion } from 'framer-motion'
import type { Technique } from '@/types'
import { DifficultyBadge } from './DifficultyBadge'

interface Props {
  tech: Technique
  onSelect: (t: Technique) => void
}

export function TechniqueCard({ tech, onSelect }: Props) {
  return (
    <motion.button
      onClick={() => onSelect(tech)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="group relative w-full text-left bg-stone-900 border border-stone-800/80
                 rounded-xl overflow-hidden cursor-pointer
                 hover:border-red-600/50
                 transition-colors duration-200
                 focus:outline-none focus-visible:ring-1 focus-visible:ring-red-600"
    >
      <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-center" />

        <span
          className="absolute right-4 bottom-3 font-display text-[72px] leading-none
                   text-stone-800/40 select-none pointer-events-none tabular-nums"
        >
          {('0' + tech.id).slice(-2)}
        </span>

      <div className="relative p-5">
          <p className="text-[10px] uppercase tracking-[0.18em] text-stone-600 mb-2">{tech.subcat}</p>

        <h3 className="font-display text-[26px] leading-none text-stone-100
                       group-hover:text-red-500 transition-colors duration-150 pr-10">
          {tech.name}
        </h3>
          <p className="text-stone-500 text-sm mt-1 mb-4">{tech.jpName}</p>

        <p className="text-stone-500 text-[13px] leading-relaxed line-clamp-2 mb-5">
            {tech.desc}
        </p>

          <div className="flex items-center justify-between">
            <DifficultyBadge diff={tech.difficulty} />
              <span className="text-stone-700 text-[10px] uppercase tracking-[0.15em] group-hover:text-stone-500 transition-colors">
                {tech.category}
              </span>
          </div>
      </div>
    </motion.button>
  )
}
