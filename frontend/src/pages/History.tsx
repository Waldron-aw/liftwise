import { useNavigate } from 'react-router-dom'
import { ChevronRight, CheckCircle2 } from 'lucide-react'

const sessions = [
  { id: '1', date: 'Thu, 15 May', day: 'Pull A', program: 'PPL Strength', sets: 18, duration: '54 min', complete: true },
  { id: '2', date: 'Tue, 13 May', day: 'Push B', program: 'PPL Strength', sets: 16, duration: '48 min', complete: true },
  { id: '3', date: 'Mon, 12 May', day: 'Legs A', program: 'PPL Strength', sets: 20, duration: '62 min', complete: true },
  { id: '4', date: 'Sat, 10 May', day: 'Pull B', program: 'PPL Strength', sets: 14, duration: '41 min', complete: false },
  { id: '5', date: 'Fri, 9 May', day: 'Push A', program: 'PPL Strength', sets: 17, duration: '52 min', complete: true },
  { id: '6', date: 'Wed, 7 May', day: 'Legs B', program: 'PPL Strength', sets: 19, duration: '58 min', complete: true },
]

export default function History() {
  const navigate = useNavigate()

  return (
    <div className="px-4 pt-6 pb-4 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">History</h1>
        <p className="text-zinc-500 text-sm mt-1">24 sessions this month</p>
      </div>

      {/* Week summary */}
      <div className="bg-zinc-900 rounded-2xl p-4 grid grid-cols-3 divide-x divide-zinc-800 text-center">
        {[
          { label: 'This week', value: '3' },
          { label: 'Volume', value: '12.4t' },
          { label: 'Avg time', value: '52m' },
        ].map(s => (
          <div key={s.label} className="px-2">
            <p className="text-lg font-bold text-zinc-100">{s.value}</p>
            <p className="text-zinc-500 text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Session list */}
      <div className="space-y-2">
        {sessions.map(s => (
          <button
            key={s.id}
            onClick={() => navigate(`/session/${s.id}`)}
            className="w-full flex items-center gap-3 bg-zinc-900 hover:bg-zinc-800 rounded-2xl px-4 py-3 transition-colors text-left"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              s.complete ? 'bg-indigo-500/10' : 'bg-zinc-800'
            }`}>
              {s.complete
                ? <CheckCircle2 size={18} className="text-indigo-400" />
                : <div className="w-4 h-4 rounded-full border-2 border-zinc-600" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-zinc-100 font-medium text-sm">{s.day}</p>
              <p className="text-zinc-500 text-xs mt-0.5">{s.date} · {s.duration} · {s.sets} sets</p>
            </div>
            <ChevronRight size={16} className="text-zinc-600 flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  )
}
