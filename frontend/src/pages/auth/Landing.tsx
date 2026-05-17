import { Dumbbell } from 'lucide-react'

interface Props {
  onSignIn: () => void
  onInvite: () => void
}

export default function Landing({ onSignIn, onInvite }: Props) {
  return (
    <div className="min-h-svh flex flex-col bg-zinc-950">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 mb-6">
          <Dumbbell className="text-indigo-400" size={36} />
        </div>
        <h1 className="text-4xl font-bold text-zinc-100 tracking-tight text-center">Liftwise</h1>
        <p className="text-zinc-500 text-center mt-3 leading-relaxed max-w-xs">
          AI-powered coaching that knows your program, your history, and your body.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {['Smart weight targets', 'Program coaching', 'Progress tracking', 'AI customisation'].map(f => (
            <span key={f} className="text-xs bg-zinc-900 border border-zinc-800 text-zinc-400 px-3 py-1.5 rounded-full">
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Auth actions */}
      <div className="px-6 pb-12 space-y-3">
        {/* Google */}
        <button
          onClick={onSignIn}
          className="w-full flex items-center justify-center gap-3 bg-white text-zinc-900 font-semibold py-3.5 rounded-2xl hover:bg-zinc-100 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
          </svg>
          Continue with Google
        </button>

        <div className="relative flex items-center gap-3">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-zinc-600 text-xs">or</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        <button
          onClick={onSignIn}
          className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-semibold py-3.5 rounded-2xl transition-colors"
        >
          Sign in with email
        </button>

        <p className="text-center text-zinc-600 text-sm pt-2">
          New here?{' '}
          <button onClick={onInvite} className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
            Use an invite code
          </button>
        </p>
      </div>
    </div>
  )
}
