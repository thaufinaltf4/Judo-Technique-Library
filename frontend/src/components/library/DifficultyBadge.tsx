import type { Difficulty } from '@/types'

interface Props {
  diff: Difficulty
}

export function DifficultyBadge({ diff }: Props) {
const cls = diff === 'beginner'
    ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-700/50'
      : diff === 'intermediate'
    ? 'bg-amber-900/50 text-amber-400 border border-amber-700/50'
      : 'bg-red-900/50 text-red-400 border border-red-700/50'

  return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wide ${cls}`}>
      {diff}
    </span>
  )
}
