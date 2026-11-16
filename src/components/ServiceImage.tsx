type ServiceImageProps = {
  slug: string
  alt: string
  priority?: boolean
  sizes?: string
  className?: string
}

// Serves the right-sized WebP for the screen and reserves space up front so
// the layout does not jump while images load.
export default function ServiceImage({
  slug,
  alt,
  priority = false,
  sizes = '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw',
  className = '',
}: ServiceImageProps) {
  return (
    <img
      src={`/images/${slug}-960.webp`}
      srcSet={`/images/${slug}-480.webp 480w, /images/${slug}-960.webp 960w`}
      sizes={sizes}
      width={960}
      height={636}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
    />
  )
}
