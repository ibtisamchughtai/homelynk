import type { ReactNode } from 'react'
import { Aurora, Reveal, SplitWords } from './motion'

type PageHeaderProps = {
  title: string
  children?: ReactNode
}

export default function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <div className="relative isolate">
      <Aurora />
      <header className="container-page pt-14 pb-12 sm:pt-20 sm:pb-16">
        <h1 className="max-w-[18ch] text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] font-bold">
          <SplitWords text={title} />
        </h1>
        {children && (
          <Reveal delay={0.35} className="lead mt-6">
            {children}
          </Reveal>
        )}
      </header>
    </div>
  )
}
