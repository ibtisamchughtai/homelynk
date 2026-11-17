import { useId, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { CircleCheck, LoaderCircle } from 'lucide-react'
import { site } from '../lib/site'

type Field = 'name' | 'email' | 'subject' | 'message'
type Values = Record<Field, string>
type Errors = Partial<Record<Field, string>>
type Status = 'idle' | 'sending' | 'sent' | 'error'

const LIMITS: Record<Field, number> = { name: 100, email: 254, subject: 150, message: 5000 }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(site.email)}`
const empty: Values = { name: '', email: '', subject: '', message: '' }

function validate(field: Field, raw: string): string | undefined {
  const value = raw.trim()
  switch (field) {
    case 'name':
      return value ? undefined : 'Enter your name.'
    case 'email':
      if (!value) return 'Enter your email address.'
      return EMAIL_PATTERN.test(value) ? undefined : 'Enter an email address like name@example.com.'
    case 'subject':
      return value ? undefined : 'Enter a subject so we know what this is about.'
    case 'message':
      if (!value) return 'Enter a message.'
      return value.length >= 10 ? undefined : 'Add a little more detail (at least 10 characters).'
  }
}

export default function ContactForm() {
  const uid = useId()
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [sentTo, setSentTo] = useState('')
  const fieldRefs = useRef<Partial<Record<Field, HTMLInputElement | HTMLTextAreaElement | null>>>({})
  const honeypotRef = useRef<HTMLInputElement>(null)

  const update = (field: Field, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    // Clear an error as soon as the field becomes valid.
    if (errors[field] && !validate(field, value)) {
      setErrors((current) => ({ ...current, [field]: undefined }))
    }
  }

  const onBlur = (field: Field) => {
    if (values[field]) setErrors((current) => ({ ...current, [field]: validate(field, values[field]) }))
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return

    const nextErrors: Errors = {}
    for (const field of Object.keys(LIMITS) as Field[]) {
      const message = validate(field, values[field])
      if (message) nextErrors[field] = message
    }
    setErrors(nextErrors)
    const firstInvalid = (Object.keys(LIMITS) as Field[]).find((field) => nextErrors[field])
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus()
      return
    }

    const email = values.email.trim()

    // Bots fill hidden fields; real people never see this one.
    if (honeypotRef.current?.value) {
      setSentTo(email)
      setStatus('sent')
      return
    }

    setStatus('sending')
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 15000)

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email,
          subject: values.subject.trim(),
          message: values.message.trim(),
          _subject: `${site.name} website: ${values.subject.trim()}`,
          _template: 'table',
          _captcha: 'false',
          _honey: '',
        }),
        signal: controller.signal,
        credentials: 'omit',
        referrerPolicy: 'strict-origin-when-cross-origin',
      })
      const data: unknown = await response.json().catch(() => null)
      const ok =
        response.ok && typeof data === 'object' && data !== null && String((data as { success?: unknown }).success) === 'true'
      if (!ok) throw new Error('Form service rejected the message')

      setSentTo(email)
      setValues(empty)
      setStatus('sent')
    } catch {
      setStatus('error')
    } finally {
      window.clearTimeout(timeout)
    }
  }

  const describedBy = (field: Field) => (errors[field] ? `${uid}-${field}-error` : undefined)

  const inputClass = (field: Field) =>
    `block w-full rounded-xl bg-field px-4 py-3 text-base text-ink ring-1 ring-inset transition-shadow placeholder:text-muted focus:bg-surface focus:ring-2 focus:ring-lynk-deep focus:outline-none ${
      errors[field] ? 'ring-danger' : 'ring-line'
    }`

  const renderField = (field: Field, label: string, props: { type?: string; autoComplete?: string; placeholder: string }) => (
    <div>
      <label htmlFor={`${uid}-${field}`} className="mb-2 block font-semibold">
        {label}
      </label>
      <input
        id={`${uid}-${field}`}
        ref={(element) => {
          fieldRefs.current[field] = element
        }}
        name={field}
        type={props.type ?? 'text'}
        autoComplete={props.autoComplete}
        placeholder={props.placeholder}
        required
        maxLength={LIMITS[field]}
        value={values[field]}
        onChange={(event) => update(field, event.target.value)}
        onBlur={() => onBlur(field)}
        aria-invalid={errors[field] ? true : undefined}
        aria-describedby={describedBy(field)}
        className={`${inputClass(field)} min-h-12`}
      />
      <FieldError id={`${uid}-${field}-error`} message={errors[field]} />
    </div>
  )

  return (
    <div className="rounded-[2rem] bg-surface p-6 ring-1 ring-line sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'sent' ? (
          <m.div
            key="sent"
            role="status"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="py-6"
          >
            <CircleCheck className="size-12 text-lynk" aria-hidden="true" />
            <h2 className="mt-5 text-3xl font-bold">Message sent.</h2>
            <p className="mt-3 text-muted">
              Thanks for reaching out. We'll reply to <span className="font-semibold break-all text-ink">{sentTo}</span> as
              soon as we can.
            </p>
            <button type="button" onClick={() => setStatus('idle')} className="btn-ghost mt-8">
              Send another message
            </button>
          </m.div>
        ) : (
          <m.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="space-y-6"
            aria-describedby={`${uid}-required`}
          >
            <div>
              <h2 className="text-3xl font-bold">Send us a message</h2>
              <p id={`${uid}-required`} className="mt-2 text-muted">
                All fields are required.
              </p>
            </div>

            {renderField('name', 'Name', { autoComplete: 'name', placeholder: 'Your name' })}
            {renderField('email', 'Email', { type: 'email', autoComplete: 'email', placeholder: 'you@example.com' })}
            {renderField('subject', 'Subject', { placeholder: 'What can we help you with?' })}

            <div>
              <label htmlFor={`${uid}-message`} className="mb-2 block font-semibold">
                Message
              </label>
              <textarea
                id={`${uid}-message`}
                ref={(element) => {
                  fieldRefs.current.message = element
                }}
                name="message"
                rows={6}
                required
                maxLength={LIMITS.message}
                placeholder="Tell us how we can help"
                value={values.message}
                onChange={(event) => update('message', event.target.value)}
                onBlur={() => onBlur('message')}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={describedBy('message')}
                className={`${inputClass('message')} resize-y`}
              />
              <FieldError id={`${uid}-message-error`} message={errors.message} />
            </div>

            {/* Honeypot: hidden from people and assistive tech, catches bots. */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor={`${uid}-honey`}>Leave this field empty</label>
              <input ref={honeypotRef} id={`${uid}-honey`} type="text" name="_honey" tabIndex={-1} autoComplete="off" />
            </div>

            {status === 'error' && (
              <p role="alert" className="rounded-xl bg-danger/10 px-4 py-3 text-danger">
                Your message didn't send. Check your connection and try again, or email us at{' '}
                <a href={`mailto:${site.email}`} className="font-semibold break-all underline">
                  {site.email}
                </a>
                .
              </p>
            )}

            <button type="submit" disabled={status === 'sending'} className="btn-lynk w-full disabled:cursor-wait disabled:opacity-70">
              {status === 'sending' ? (
                <>
                  <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
                  Sending message
                </>
              ) : (
                'Send message'
              )}
            </button>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-2 text-sm font-medium text-danger">
      {message}
    </p>
  )
}
