import { ExternalLink } from 'lucide-react'
import { site } from '../lib/site'

export default function StoreButtons() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a href={site.playStoreUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
        Get it on Google Play
        <ExternalLink className="size-4" aria-hidden="true" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
      {site.appStoreUrl ? (
        <a href={site.appStoreUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Download on the App Store
          <ExternalLink className="size-4" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ) : (
        <span className="inline-flex min-h-12 items-center justify-center rounded-full px-6 font-semibold text-ink ring-1 ring-ink/40 ring-inset">
          App Store coming soon
        </span>
      )}
    </div>
  )
}
