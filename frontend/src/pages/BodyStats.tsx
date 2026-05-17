import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Scale, Plus } from 'lucide-react'

const weightHistory = [
  { date: 'Apr 1', weight: 79.8 }, { date: 'Apr 8', weight: 79.2 }, { date: 'Apr 15', weight: 78.9 },
  { date: 'Apr 22', weight: 78.6 }, { date: 'May 1', weight: 78.4 }, { date: 'May 8', weight: 78.2 },
  { date: 'May 15', weight: 78.4 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-sm">
      <p className="text-zinc-400">{label}</p>
      <p className="text-indigo-400 font-semibold">{payload[0].value}kg</p>
    </div>
  )
}

export default function BodyStats() {
  const [weight, setWeight] = useState('')
  const current = weightHistory[weightHistory.length - 1].weight
  const start = weightHistory[0].weight
  const change = +(current - start).toFixed(1)

  return (
    <div className="px-4 pt-6 pb-4 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Body Stats</h1>
        <p className="text-zinc-500 text-sm mt-1">Track your body composition</p>
      </div>

      {/* Current stats */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-zinc-900 rounded-2xl p-4">
          <Scale size={18} className="text-zinc-500 mb-2" />
          <p className="text-2xl font-bold text-zinc-100">{current}<span className="text-sm font-normal text-zinc-500 ml-1">kg</span></p>
          <p className="text-zinc-500 text-xs mt-0.5">Body weight</p>
          <p className={`text-xs mt-1 font-medium ${change <= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {change > 0 ? '+' : ''}{change}kg since Apr
          </p>
        </div>
        <div className="bg-zinc-900 rounded-2xl p-4">
          <div className="w-4.5 h-4.5 mb-2">
            <span className="text-zinc-500 text-lg">📏</span>
          </div>
          <p className="text-2xl font-bold text-zinc-100">–</p>
          <p className="text-zinc-500 text-xs mt-0.5">Body fat %</p>
          <p className="text-zinc-600 text-xs mt-1">Not logged</p>
        </div>
      </div>

      {/* Log today */}
      <div className="bg-zinc-900 rounded-2xl p-4 space-y-3">
        <p className="text-zinc-300 font-medium text-sm">Log today's weight</p>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="number"
              step="0.1"
              placeholder="78.4"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">kg</span>
          </div>
          <button className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2.5 rounded-xl text-sm transition-colors">
            <Plus size={14} /> Log
          </button>
        </div>
      </div>

      {/* Weight chart */}
      <div className="bg-zinc-900 rounded-2xl p-4">
        <p className="text-zinc-300 font-medium text-sm mb-4">Weight trend</p>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={weightHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis dataKey="date" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis
              domain={['auto', 'auto']}
              tick={{ fill: '#71717a', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `${v}`}
              width={35}
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

      {/* Log history */}
      <div className="space-y-2">
        <h2 className="text-zinc-300 font-semibold text-sm">Recent logs</h2>
        <div className="bg-zinc-900 rounded-2xl divide-y divide-zinc-800">
          {[...weightHistory].reverse().slice(0, 5).map((entry, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3">
              <p className="text-zinc-400 text-sm">{entry.date}</p>
              <p className="text-zinc-100 font-medium text-sm">{entry.weight} kg</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
