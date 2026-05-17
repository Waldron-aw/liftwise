import { useState } from 'react'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'

interface Props {
  onBack: () => void
  onComplete: (name: string, email: string) => void
}

export default function CreateAccount({ onBack, onComplete }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const valid = name.trim() && email.includes('@') && password.length >= 8

  return (
    <div className="min-h-svh flex flex-col bg-zinc-950 px-6 pt-14">
      <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors mb-10 -ml-1">
        <ArrowLeft size={18} />
        <span className="text-sm">Back</span>
      </button>

      <div className="flex-1 flex flex-col">
        <h1 className="text-2xl font-bold text-zinc-100">Create your account</h1>
        <p className="text-zinc-500 text-sm mt-2">You're in. Let's set up your profile.</p>

        <div className="mt-8 space-y-3">
          {/* Google option */}
          <button
            onClick={() => onComplete('Alex Waldron', 'alex@example.com')}
            className="w-full flex items-center justify-center gap-3 bg-white text-zinc-900 font-semibold py-3.5 rounded-2xl hover:bg-zinc-100 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
            </svg>
            Sign up with Google
          </button>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-zinc-600 text-xs">or</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Full name"
            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password (min 8 characters)"
              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          onClick={() => valid && onComplete(name.trim(), email.trim())}
          disabled={!valid}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-semibold py-4 rounded-2xl transition-colors"
        >
          Create account
        </button>

        <p className="text-zinc-600 text-xs text-center mt-4 leading-relaxed">
          By continuing you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}
