import { useState } from 'react'
import { Search, ChevronRight } from 'lucide-react'

const categories = ['All', 'Push', 'Pull', 'Legs', 'Core', 'Cardio']

const exercises = [
  { name: 'Bench Press', muscles: 'Chest, Triceps, Shoulders', equipment: 'Barbell', type: 'Push' },
  { name: 'Incline DB Press', muscles: 'Upper Chest, Triceps', equipment: 'Dumbbell', type: 'Push' },
  { name: 'Overhead Press', muscles: 'Shoulders, Triceps', equipment: 'Barbell', type: 'Push' },
  { name: 'Lateral Raises', muscles: 'Side Delts', equipment: 'Dumbbell', type: 'Push' },
  { name: 'Tricep Pushdown', muscles: 'Triceps', equipment: 'Cable', type: 'Push' },
  { name: 'Pull-up', muscles: 'Lats, Biceps, Rear Delts', equipment: 'Bodyweight', type: 'Pull' },
  { name: 'Barbell Row', muscles: 'Lats, Rhomboids, Biceps', equipment: 'Barbell', type: 'Pull' },
  { name: 'Face Pull', muscles: 'Rear Delts, External Rotators', equipment: 'Cable', type: 'Pull' },
  { name: 'Squat', muscles: 'Quads, Glutes, Hamstrings', equipment: 'Barbell', type: 'Legs' },
  { name: 'Romanian Deadlift', muscles: 'Hamstrings, Glutes', equipment: 'Barbell', type: 'Legs' },
  { name: 'Leg Press', muscles: 'Quads, Glutes', equipment: 'Machine', type: 'Legs' },
  { name: 'Calf Raise', muscles: 'Calves', equipment: 'Machine', type: 'Legs' },
  { name: 'Plank', muscles: 'Core, Shoulders', equipment: 'Bodyweight', type: 'Core' },
  { name: 'Ab Rollout', muscles: 'Core, Lats', equipment: 'Barbell', type: 'Core' },
]

const equipmentColors: Record<string, string> = {
  Barbell: 'bg-orange-500/10 text-orange-400',
  Dumbbell: 'bg-blue-500/10 text-blue-400',
  Cable: 'bg-purple-500/10 text-purple-400',
  Machine: 'bg-green-500/10 text-green-400',
  Bodyweight: 'bg-zinc-500/10 text-zinc-400',
}

export default function Exercises() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = exercises.filter(ex => {
    const matchSearch = ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.muscles.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'All' || ex.type === category
    return matchSearch && matchCat
  })

  return (
    <div className="px-4 pt-6 pb-4 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Exercises</h1>
        <p className="text-zinc-500 text-sm mt-1">{exercises.length} exercises</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search exercises or muscles..."
          className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              category === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="bg-zinc-900 rounded-2xl divide-y divide-zinc-800">
        {filtered.map((ex, i) => (
          <button key={i} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 transition-colors text-left first:rounded-t-2xl last:rounded-b-2xl">
            <div className="flex-1 min-w-0">
              <p className="text-zinc-100 text-sm font-medium">{ex.name}</p>
              <p className="text-zinc-500 text-xs mt-0.5">{ex.muscles}</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-md font-medium flex-shrink-0 ${equipmentColors[ex.equipment] || 'bg-zinc-800 text-zinc-400'}`}>
              {ex.equipment}
            </span>
            <ChevronRight size={14} className="text-zinc-600 flex-shrink-0" />
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-zinc-500 text-sm text-center py-8">No exercises found</p>
        )}
      </div>
    </div>
  )
}
