type LogoProps = {
  tone?: 'ink' | 'paper'
}

export default function Logo({ tone = 'ink' }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="size-9 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill="#047857" />
        <path
          d="M8 15.5 16 9l8 6.5V23a1 1 0 0 1-1 1h-4.5v-5h-5v5H9a1 1 0 0 1-1-1z"
          fill="none"
          stroke="#fff"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="9" r="3.2" fill="#34D399" />
      </svg>
      <span
        className={`font-display text-[1.375rem] font-bold tracking-[-0.03em] ${
          tone === 'ink' ? 'text-ink' : 'text-paper'
        }`}
      >
        HomeLynk
      </span>
    </span>
  )
}
