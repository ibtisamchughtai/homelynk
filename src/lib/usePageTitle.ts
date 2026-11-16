import { useEffect } from 'react'
import { site } from './site'

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${site.name}` : `${site.name} | Book trusted home services`
  }, [title])
}
