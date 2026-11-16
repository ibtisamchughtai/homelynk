import StoreButtons from './StoreButtons'

type DownloadBandProps = {
  id?: string
}

export default function DownloadBand({ id }: DownloadBandProps) {
  return (
    <section id={id} aria-labelledby="download-title" className="container-page mt-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-12 text-paper sm:px-12 sm:py-16">
        <svg
          viewBox="0 0 600 300"
          className="pointer-events-none absolute right-8 bottom-8 hidden w-[26rem] md:block text-lynk opacity-70"
          aria-hidden="true"
        >
          <path d="M20 260 C 180 260, 200 60, 380 80 S 560 200, 590 40" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="20" cy="260" r="9" fill="currentColor" />
          <circle cx="590" cy="40" r="9" fill="#FFC633" />
        </svg>
        <div className="relative max-w-xl">
          <h2 id="download-title" className="text-4xl font-bold text-paper sm:text-5xl">
            Ready to book your next service?
          </h2>
          <p className="mt-4 text-lg text-paper/75">Download HomeLynk and get started today.</p>
          <div className="mt-8">
            <StoreButtons />
          </div>
        </div>
      </div>
    </section>
  )
}
