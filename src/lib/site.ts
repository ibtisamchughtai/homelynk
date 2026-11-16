// Single source of truth for business details. Update these in one place.
export const site = {
  name: 'HomeLynk',
  tagline: 'Home services, made simple.',
  email: 'lasalle@sciplus.ca',
  phoneDisplay: '+1 (438) 230-9661',
  phoneHref: 'tel:+14382309661',
  location: 'LaSalle & Châteauguay, Quebec',
  hours: 'Mon to Fri, 9:00 AM to 7:00 PM',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.sciplus.marketplace',
  // Set this once the iOS app is published. While null, the App Store
  // badge shows as "coming soon" instead of a dead button.
  appStoreUrl: null as string | null,
} as const

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/features', label: 'Features' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/contact', label: 'Contact' },
] as const

export const services = [
  { slug: 'home-cleaning', title: 'Home cleaning', blurb: 'Regular upkeep for kitchens, bathrooms and living spaces.' },
  { slug: 'deep-cleaning', title: 'Deep cleaning', blurb: 'Top-to-bottom cleaning for move-ins, move-outs and resets.' },
  { slug: 'moving-help', title: 'Moving help', blurb: 'Extra hands for packing, lifting and loading.' },
  { slug: 'repairs', title: 'Repairs', blurb: 'Fixes for leaks, fixtures and everyday wear.' },
] as const
