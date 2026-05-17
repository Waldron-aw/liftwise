import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const exercises = ['Bench Press', 'Squat', 'Deadlift', 'Overhead Press', 'Pull-up']

const mockData: Record<string, { date: string; weight: number }[]> = {
  'Bench Press': [
    { date: 'Apr 1', weight: 70 }, { date: 'Apr 8', weight: 72.5 }, { date: 'Apr 15', weight: 75 },
    { date: 'Apr 22', weight: 75 }, { date: 'May 1', weight: 77.5 }, { date: 'May 8', weight: 80 },
    { date: 'May 15', weight: 80 },
  ],
  'Squat': [
    { date: 'Apr 1', weight: 90 }, { date: 'Apr 8', weight: 95 }, { date: 'Apr 15', weight: 97.5 },
    { date: 'Apr 22', weight: 100 }, { date: 'May 1', weight: 102.5 }, { date: 'May 8', weight: 105 },
    { date: 'May 15', weight: 107.5 },
  ],
  'Deadlift': [
    { date: 'Apr 1', weight: 120 }, { date: 'Apr 8', weight: 125 }, { date: 'Apr 15', weight: 127.5 },
    { date: 'Apr 22', weight: 130 }, { date: 'May 1', weight: 132.5 }, { date: 'May 8', weight: 135 },
    { date: 'May 15', weight: 140 },
  ],
  'Overhead Press': [
    { date: 'Apr 1', weight: 45 }, { date: 'Apr 8', weight: 47.5 }, { date: 'Apr 15', weight: 50 },
    { date: 'Apr 22', weight: 50 }, { date: 'May 1', weight: 52.5 }, { date: 'May 8', weight: 52.5 },
    { date: 'May 15', weight: 52.5 },
  ],
  'Pull-up': [
    { date: 'Apr 1', weight: 0 }, { date: 'Apr 8', weight: 2.5 }, { date: 'Apr 15', weight: 5 },
    { date: 'Apr 22', weight: 5 }, { date: 'May 1', weight: 7.5 }, { date: 'May 8', weight: 10 },
    { date: 'May 15', weight: 10 },
  ],
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm">
      <p className="text-zinc-400">{label}</p>
      <p className="text-indigo-400 font-semibold">{payload[0].value}kg</p>
    </div>
  )
}

export default function Progress() {
  const [selected, setSelected] = useState('Bench Press')
  const data = mockData[selected]
  const first = data[0].weight
  const last = data[data.length - 1].weight
  const gain = last - first
  const gainPct = Math.round((gain / first) * 100)

  return (
    <div className="px-4 pt-6 pb-4 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Progress</h1>
        <p className="text-zinc-500 text-sm mt-1">Track your strength over time</p>
      </div>

      {/* Exercise selector */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
        {exercises.map(ex => (
          <button
            key={ex}
            onClick={() => setSelected(ex)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selected === ex
                ? 'bg-indigo-600 text-white'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {ex}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-zinc-900 rounded-2xl p-3 text-center">
          <p className="text-xl font-bold text-zinc-100">{last}kg</p>
          <p className="text-zinc-500 text-xs mt-0.5">Current</p>
        </div>
        <div className="bg-zinc-900 rounded-2xl p-3 text-center">
          <p className="text-xl font-bold text-emerald-400">+{gain}kg</p>
          <p className="text-zinc-500 text-xs mt-0.5">Total gain</p>
        </div>
        <div className="bg-zinc-900 rounded-2xl p-3 text-center">
          <p className="text-xl font-bold text-emerald-400">+{gainPct}%</p>
          <p className="text-zinc-500 text-xs mt-0.5">Since start</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-zinc-900 rounded-2xl p-4" style={{ contain: 'layout' }}>
        <p className="text-zinc-300 font-medium text-sm mb-4">{selected} — Working Weight</p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis dataKey="date" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis
              domain={['auto', 'auto']}
              tick={{ fill: '#71717a', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `${v}kg`}
              width={45}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#6366f1"
              strokeWidth={2.5}
              dot={{ fill: '#6366f1', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#818cf8' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* PRs */}
      <div className="space-y-2">
        <h2 className="text-zinc-300 font-semibold text-sm">Personal Records</h2>
        {[
          { name: 'Bench Press', pr: '85kg', date: 'Mar 2025' },
          { name: 'Squat', pr: '120kg', date: 'Feb 2025' },
          { name: 'Deadlift', pr: '155kg', date: 'Apr 2025' },
        ].map(pr => (
          <div key={pr.name} className="flex items-center justify-between bg-zinc-900 rounded-2xl px-4 py-3">
            <p className="text-zinc-300 text-sm">{pr.name}</p>
            <div className="text-right">
              <p className="text-zinc-100 font-semibold">{pr.pr}</p>
              <p className="text-zinc-600 text-xs">{pr.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
