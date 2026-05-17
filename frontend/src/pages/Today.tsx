import { useNavigate } from 'react-router-dom'
import { ChevronRight, Zap, Scale, Flame } from 'lucide-react'

const todaySession = {
  day: 'Push A',
  program: 'PPL Strength',
  exercises: [
    { name: 'Bench Press', sets: 4, reps: '5', lastWeight: '80kg' },
    { name: 'Overhead Press', sets: 3, reps: '8', lastWeight: '52.5kg' },
    { name: 'Incline DB Press', sets: 3, reps: '10-12', lastWeight: '30kg' },
    { name: 'Lateral Raises', sets: 4, reps: '15', lastWeight: '12kg' },
    { name: 'Tricep Pushdown', sets: 3, reps: '12', lastWeight: '25kg' },
  ],
}

const aiCoaching = {
  note: "Good sleep last night. Bench is on track — push for 82.5kg today, you've hit 5×5 at 80 two sessions in a row. Keep OHP conservative.",
}

const stats = [
  { label: 'This week', value: '3', unit: 'sessions' },
  { label: 'Body weight', value: '78.4', unit: 'kg' },
  { label: 'Streak', value: '9', unit: 'days' },
]

export default function Today() {
  const navigate = useNavigate()

  return (
    <div className="px-4 pt-6 pb-4 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-zinc-500 text-sm">Sunday, 17 May</p>
          <h1 className="text-2xl font-bold text-zinc-100 mt-0.5">Good morning</h1>
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

      {/* AI coaching note */}
      <div className="bg-indigo-950/60 border border-indigo-500/20 rounded-2xl p-4 flex gap-3">
        <div className="mt-0.5">
          <Zap size={16} className="text-indigo-400" />
        </div>
        <p className="text-zinc-300 text-sm leading-relaxed">{aiCoaching.note}</p>
      </div>

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
                <p className="text-zinc-100 text-sm font-medium">{ex.name}</p>
                <p className="text-zinc-500 text-xs mt-0.5">{ex.sets} × {ex.reps}</p>
              </div>
              <span className="text-zinc-400 text-sm">{ex.lastWeight}</span>
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
