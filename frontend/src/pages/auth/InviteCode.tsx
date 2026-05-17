import { useState } from 'react'
import { ArrowLeft, Ticket } from 'lucide-react'

interface Props {
  onBack: () => void
  onValid: (code: string) => void
}

const VALID_CODES = ['LIFT2025', 'BETA001', 'ALPHA42'] // mock valid codes

export default function InviteCode({ onBack, onValid }: Props) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(false)

  const handleSubmit = () => {
    setError('')
    setChecking(true)
    setTimeout(() => {
      setChecking(false)
      if (VALID_CODES.includes(code.toUpperCase().trim())) {
        onValid(code.toUpperCase().trim())
      } else {
        setError('Invalid invite code. Check with the person who sent it.')
      }
    }, 800)
  }

  return (
    <div className="min-h-svh flex flex-col bg-zinc-950 px-6 pt-14">
      <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors mb-10 -ml-1">
        <ArrowLeft size={18} />
        <span className="text-sm">Back</span>
      </button>

      <div className="flex-1 flex flex-col">
        <div className="inline-flex w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 items-center justify-center mb-6">
          <Ticket size={24} className="text-indigo-400" />
        </div>

        <h1 className="text-2xl font-bold text-zinc-100">Enter your invite code</h1>
        <p className="text-zinc-500 text-sm mt-2 leading-relaxed">
          Liftwise is invite-only. Get a code from someone already using it.
        </p>

        <div className="mt-8 space-y-3">
          <input
            value={code}
            onChange={e => { setCode(e.target.value.toUpperCase()); setError('') }}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="e.g. LIFT2025"
            maxLength={16}
            className={`w-full bg-zinc-900 border text-zinc-100 placeholder-zinc-600 rounded-2xl px-5 py-4 text-lg font-mono tracking-widest text-center focus:outline-none transition-colors ${
              error ? 'border-rose-500/60' : 'border-zinc-800 focus:border-indigo-500'
            }`}
          />
          {error && (
            <p className="text-rose-400 text-sm text-center">{error}</p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!code.trim() || checking}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-semibold py-4 rounded-2xl transition-colors"
        >
          {checking ? 'Checking...' : 'Continue'}
        </button>

        <p className="text-zinc-600 text-xs text-center mt-6">
          Try <span className="text-zinc-500 font-mono">LIFT2025</span> to demo the flow
        </p>
      </div>
    </div>
  )
}
