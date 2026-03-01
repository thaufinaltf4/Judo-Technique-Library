interface Props {
  videoId: string
  startSeconds?: number
  endSeconds?: number
  autoplay?: boolean
}

export function YouTubeEmbed({ videoId, startSeconds = 0, endSeconds, autoplay = false }: Props) {
  if (!videoId) {
    return (
        <div className="relative w-full aspect-video bg-stone-900 rounded-lg overflow-hidden flex items-center justify-center">
          <p className="text-stone-600 text-sm">No video available</p>
        </div>
    )
  }

  let src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?start=' + startSeconds
  if (endSeconds) src += '&end=' + endSeconds
  src += '&autoplay=' + (autoplay ? 1 : 0) + '&rel=0&modestbranding=1'

  return (
    <div className="relative w-full aspect-video bg-stone-900 rounded-lg overflow-hidden">
        <iframe
          src={src}
          title="Technique video"
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
    </div>
  )
}
