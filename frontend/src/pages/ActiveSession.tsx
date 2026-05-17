import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Circle, ChevronDown, ChevronUp, X, Plus, Timer } from 'lucide-react'

const exercises = [
  {
    name: 'Bench Press',
    target: '4 × 5 @ 82.5kg',
    sets: [
      { weight: '82.5', reps: '5', done: false },
      { weight: '82.5', reps: '5', done: false },
      { weight: '82.5', reps: '5', done: false },
      { weight: '82.5', reps: '5', done: false },
    ],
  },
  {
    name: 'Overhead Press',
    target: '3 × 8 @ 52.5kg',
    sets: [
      { weight: '52.5', reps: '8', done: false },
      { weight: '52.5', reps: '8', done: false },
      { weight: '52.5', reps: '8', done: false },
    ],
  },
  {
    name: 'Incline DB Press',
    target: '3 × 10-12 @ 30kg',
    sets: [
      { weight: '30', reps: '10', done: false },
      { weight: '30', reps: '10', done: false },
      { weight: '30', reps: '10', done: false },
    ],
  },
]

type Set = { weight: string; reps: string; done: boolean }
type Exercise = { name: string; target: string; sets: Set[] }

export default function ActiveSession() {
  const navigate = useNavigate()
  const [data, setData] = useState<Exercise[]>(exercises)
  const [expanded, setExpanded] = useState<number | null>(0)
  const [elapsed, setElapsed] = useState('00:00')

  const toggleSet = (exIdx: number, setIdx: number) => {
    setData(prev => prev.map((ex, ei) =>
      ei !== exIdx ? ex : {
        ...ex,
        sets: ex.sets.map((s, si) => si !== setIdx ? s : { ...s, done: !s.done }),
      }
    ))
  }

  const updateSet = (exIdx: number, setIdx: number, field: 'weight' | 'reps', val: string) => {
    setData(prev => prev.map((ex, ei) =>
      ei !== exIdx ? ex : {
        ...ex,
        sets: ex.sets.map((s, si) => si !== setIdx ? s : { ...s, [field]: val }),
      }
    ))
  }

  const totalSets = data.reduce((a, ex) => a + ex.sets.length, 0)
  const doneSets = data.reduce((a, ex) => a + ex.sets.filter(s => s.done).length, 0)
  const progress = Math.round((doneSets / totalSets) * 100)

  return (
    <div className="flex flex-col min-h-svh bg-zinc-950">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-zinc-100">Push A</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Timer size={12} className="text-zinc-500" />
              <span className="text-zinc-500 text-xs">{elapsed}</span>
            </div>
          </div>
          <button onClick={() => navigate('/today')} className="text-zinc-500 hover:text-zinc-300">
            <X size={22} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-zinc-500">
            <span>{doneSets}/{totalSets} sets</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Exercise list */}
      <div className="flex-1 px-4 space-y-3 pb-6">
        {data.map((ex, ei) => (
          <div key={ei} className="bg-zinc-900 rounded-2xl overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-4 py-3"
              onClick={() => setExpanded(expanded === ei ? null : ei)}
            >
              <div className="text-left">
                <p className="text-zinc-100 font-medium">{ex.name}</p>
                <p className="text-zinc-500 text-xs mt-0.5">{ex.target}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500">
                  {ex.sets.filter(s => s.done).length}/{ex.sets.length}
                </span>
                {expanded === ei ? <ChevronUp size={16} className="text-zinc-500" /> : <ChevronDown size={16} className="text-zinc-500" />}
              </div>
            </button>

            {expanded === ei && (
              <div className="border-t border-zinc-800">
                {/* Column headers */}
                <div className="grid grid-cols-12 gap-2 px-4 py-2 text-xs text-zinc-600">
                  <span className="col-span-1">#</span>
                  <span className="col-span-4">Weight</span>
                  <span className="col-span-4">Reps</span>
                  <span className="col-span-3 text-right">Done</span>
                </div>
                {ex.sets.map((s, si) => (
                  <div key={si} className={`grid grid-cols-12 gap-2 px-4 py-2 items-center ${s.done ? 'opacity-50' : ''}`}>
                    <span className="col-span-1 text-zinc-500 text-sm">{si + 1}</span>
                    <div className="col-span-4">
                      <input
                        className="w-full bg-zinc-800 text-zinc-100 text-sm rounded-lg px-2 py-1.5 text-center focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        value={s.weight}
                        onChange={e => updateSet(ei, si, 'weight', e.target.value)}
                      />
                    </div>
                    <div className="col-span-4">
                      <input
                        className="w-full bg-zinc-800 text-zinc-100 text-sm rounded-lg px-2 py-1.5 text-center focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        value={s.reps}
                        onChange={e => updateSet(ei, si, 'reps', e.target.value)}
                      />
                    </div>
                    <div className="col-span-3 flex justify-end">
                      <button onClick={() => toggleSet(ei, si)}>
                        {s.done
                          ? <CheckCircle2 size={22} className="text-indigo-400" />
                          : <Circle size={22} className="text-zinc-600" />}
                      </button>
                    </div>
                  </div>
                ))}
                <div className="px-4 py-2 border-t border-zinc-800">
                  <button className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
                    <Plus size={14} /> Add set
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Finish button */}
      <div className="px-4 pb-8 pt-2">
        <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-4 rounded-2xl transition-colors">
          Finish session
        </button>
      </div>
    </div>
  )
}
