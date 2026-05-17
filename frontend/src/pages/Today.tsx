import { useNavigate, useOutletContext } from 'react-router-dom'
import { ChevronRight, Scale, MessageCircle } from 'lucide-react'
import type { LayoutContext } from '../components/Layout'

const todaySession = {
  day: 'Push A',
  program: 'PPL Strength',
  exercises: [
    { name: 'Bench Press', sets: 4, reps: '5', target: '82.5kg', lastWeight: '80kg', isKeyLift: true },
    { name: 'Overhead Press', sets: 3, reps: '8', target: '52.5kg', lastWeight: '52.5kg', isKeyLift: false },
    { name: 'Incline DB Press', sets: 3, reps: '10-12', target: '30kg', lastWeight: '30kg', isKeyLift: false },
    { name: 'Lateral Raises', sets: 4, reps: '15', target: '12kg', lastWeight: '12kg', isKeyLift: false },
    { name: 'Tricep Pushdown', sets: 3, reps: '12', target: '25kg', lastWeight: '25kg', isKeyLift: false },
  ],
}

const stats = [
  { label: 'This week', value: '3', unit: 'sessions' },
  { label: 'Body weight', value: '78.4', unit: 'kg' },
  { label: 'Streak', value: '9', unit: 'days' },
]

export default function Today() {
  const navigate = useNavigate()
  const { openChat } = useOutletContext<LayoutContext>()

  return (
    <div className="px-4 pt-6 pb-4 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-zinc-500 text-sm">Sunday, 17 May</p>
          <h1 className="text-2xl font-bold text-zinc-100 mt-0.5">Good morning, Alex</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
          <span className="text-indigo-400 text-sm font-semibold">AW</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2">
        {stats.map(s => (
          <div key={s.label} className="bg-zinc-900 rounded-2xl p-3 text-center">
            <p className="text-xl font-bold text-zinc-100">{s.value}<span className="text-sm font-normal text-zinc-500 ml-0.5">{s.unit}</span></p>
            <p className="text-zinc-500 text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* AI Coach brief card — tappable */}
      <button
        onClick={openChat}
        className="w-full text-left bg-indigo-950/60 border border-indigo-500/25 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-colors"
      >
        <div className="flex items-center gap-2 px-4 pt-3 pb-2 border-b border-indigo-500/15">
          <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">C</span>
          </div>
          <span className="text-indigo-300 text-xs font-semibold">Coach · Today's brief</span>
          <span className="ml-auto text-indigo-400/60 text-xs">Tap to reply</span>
        </div>
        <div className="px-4 py-3 space-y-2">
          <p className="text-zinc-200 text-sm leading-relaxed">
            Push A today — your 4th session this week and you're on a 9-day streak. Strong week.
          </p>
          <p className="text-zinc-300 text-sm leading-relaxed">
            <span className="text-indigo-300 font-medium">Bench:</span> Go for 82.5kg today. You've hit 5×5 at 80kg back-to-back — you're ready for the jump.
          </p>
          <p className="text-zinc-300 text-sm leading-relaxed">
            <span className="text-indigo-300 font-medium">OHP:</span> Hold at 52.5kg × 8 for one more session. Form looked shaky last time.
          </p>
          <p className="text-zinc-400 text-xs mt-1">Everything else same as last session. Let me know if anything feels off.</p>
        </div>
        <div className="flex items-center gap-1.5 px-4 py-2 border-t border-indigo-500/15">
          <MessageCircle size={12} className="text-indigo-400/60" />
          <span className="text-indigo-400/60 text-xs">Reply to your coach</span>
        </div>
      </button>

      {/* Today's session */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-zinc-100">{todaySession.day}</h2>
            <p className="text-zinc-500 text-xs mt-0.5">{todaySession.program}</p>
          </div>
          <button
            onClick={() => navigate('/session/today')}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors flex items-center gap-1"
          >
            Start <ChevronRight size={14} />
          </button>
        </div>

        <div className="bg-zinc-900 rounded-2xl divide-y divide-zinc-800">
          {todaySession.exercises.map((ex, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-zinc-100 text-sm font-medium">{ex.name}</p>
                  {ex.isKeyLift && (
                    <span className="text-[10px] bg-indigo-500/15 text-indigo-400 px-1.5 py-0.5 rounded-md font-medium">↑ PR attempt</span>
                  )}
                </div>
                <p className="text-zinc-500 text-xs mt-0.5">{ex.sets} × {ex.reps}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${ex.target !== ex.lastWeight ? 'text-indigo-400' : 'text-zinc-400'}`}>
                  {ex.target}
                </p>
                {ex.target !== ex.lastWeight && (
                  <p className="text-zinc-600 text-xs line-through">{ex.lastWeight}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick log body weight */}
      <button
        onClick={() => navigate('/stats')}
        className="w-full flex items-center gap-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-2xl px-4 py-3 transition-colors"
      >
        <Scale size={18} className="text-zinc-500" />
        <span className="text-zinc-400 text-sm">Log today's weight</span>
        <ChevronRight size={16} className="text-zinc-600 ml-auto" />
      </button>
    </div>
  )
}
