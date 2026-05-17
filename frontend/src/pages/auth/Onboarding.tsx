import { useState } from 'react'
import { ArrowLeft, Check, ChevronRight } from 'lucide-react'

interface Props {
  name: string
  onComplete: () => void
}

type Goal = 'strength' | 'muscle' | 'athletic' | 'fitness'
type Days = 3 | 4 | 5 | 6
type Equipment = 'full_gym' | 'barbell_home' | 'dumbbells' | 'bodyweight'

const goals: { id: Goal; label: string; desc: string; emoji: string }[] = [
  { id: 'strength', label: 'Get stronger', desc: 'Focus on moving heavier weights', emoji: '🏋️' },
  { id: 'muscle', label: 'Build muscle', desc: 'Hypertrophy and body composition', emoji: '💪' },
  { id: 'athletic', label: 'Athletic performance', desc: 'Speed, power, conditioning', emoji: '⚡' },
  { id: 'fitness', label: 'General fitness', desc: 'Health, movement, longevity', emoji: '🎯' },
]

const dayOptions: { value: Days; label: string; sub: string }[] = [
  { value: 3, label: '3 days', sub: 'Full body · ideal for busy schedules' },
  { value: 4, label: '4 days', sub: 'Upper/lower split · great balance' },
  { value: 5, label: '5 days', sub: 'PPL + extras · serious training' },
  { value: 6, label: '6 days', sub: 'PPL × 2 · maximum frequency' },
]

const equipmentOptions: { id: Equipment; label: string; sub: string; emoji: string }[] = [
  { id: 'full_gym', label: 'Full gym', sub: 'Barbells, machines, cables', emoji: '🏪' },
  { id: 'barbell_home', label: 'Home barbell setup', sub: 'Barbell, rack, plates', emoji: '🏠' },
  { id: 'dumbbells', label: 'Dumbbells only', sub: 'Adjustable or fixed dumbbells', emoji: '🔧' },
  { id: 'bodyweight', label: 'Bodyweight only', sub: 'No equipment needed', emoji: '🤸' },
]

const programRecommendations: Record<Goal, Record<Equipment, { name: string; desc: string; days: string }>> = {
  strength: {
    full_gym: { name: '5/3/1 BBB', desc: 'Proven strength program built on the four main lifts.', days: '4 days/week' },
    barbell_home: { name: 'Texas Method', desc: 'Volume/intensity cycling for steady strength gains.', days: '3 days/week' },
    dumbbells: { name: 'Dumbbell Strength', desc: 'Compound movements adapted for dumbbells.', days: '4 days/week' },
    bodyweight: { name: 'Bodyweight Strength', desc: 'Progressive calisthenics for functional strength.', days: '4 days/week' },
  },
  muscle: {
    full_gym: { name: 'PPL Strength', desc: 'Push/Pull/Legs with progressive overload focus.', days: '6 days/week' },
    barbell_home: { name: 'Upper/Lower Hypertrophy', desc: 'High volume upper and lower splits.', days: '4 days/week' },
    dumbbells: { name: 'Dumbbell Hypertrophy', desc: 'Full body dumbbell program for muscle growth.', days: '4 days/week' },
    bodyweight: { name: 'Calisthenics Muscle', desc: 'Weighted progressions for bodyweight hypertrophy.', days: '5 days/week' },
  },
  athletic: {
    full_gym: { name: 'Athletic Performance', desc: 'Power, speed, and conditioning combined.', days: '5 days/week' },
    barbell_home: { name: 'Power & Strength', desc: 'Olympic lift variations and heavy compounds.', days: '4 days/week' },
    dumbbells: { name: 'Athletic Conditioning', desc: 'Explosive movements and circuit training.', days: '4 days/week' },
    bodyweight: { name: 'Functional Athletic', desc: 'Plyometrics, gymnastics strength, and conditioning.', days: '5 days/week' },
  },
  fitness: {
    full_gym: { name: 'General Fitness', desc: 'Balanced strength and cardio for overall health.', days: '4 days/week' },
    barbell_home: { name: 'Barbell Basics', desc: 'Simple, effective compound lifting.', days: '3 days/week' },
    dumbbells: { name: 'Dumbbell Fitness', desc: 'Accessible full-body training at home.', days: '3 days/week' },
    bodyweight: { name: 'Move Well', desc: 'Mobility, strength, and cardio with zero equipment.', days: '4 days/week' },
  },
}

export default function Onboarding({ name, onComplete }: Props) {
  const [step, setStep] = useState(0)
  const [goal, setGoal] = useState<Goal | null>(null)
  const [days, setDays] = useState<Days | null>(null)
  const [equipment, setEquipment] = useState<Equipment | null>(null)

  const firstName = name.split(' ')[0]
  const totalSteps = 4

  const recommended = goal && equipment ? programRecommendations[goal][equipment] : null

  const back = () => setStep(s => Math.max(0, s - 1))

  return (
    <div className="min-h-svh flex flex-col bg-zinc-950">
      {/* Progress bar */}
      <div className="px-6 pt-14 pb-2">
        {step > 0 && step < totalSteps && (
          <button onClick={back} className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors mb-6 -ml-1">
            <ArrowLeft size={18} />
            <span className="text-sm">Back</span>
          </button>
        )}
        {step < totalSteps && (
          <div className="flex gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-indigo-500' : 'bg-zinc-800'}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col px-6 py-6">

        {/* Step 0: Goal */}
        {step === 0 && (
          <div className="flex-1 flex flex-col">
            <div className="mb-6">
              <p className="text-indigo-400 text-sm font-medium mb-1">Hey {firstName}! 👋</p>
              <h2 className="text-2xl font-bold text-zinc-100">What's your main goal?</h2>
              <p className="text-zinc-500 text-sm mt-2">This shapes your program and coaching style.</p>
            </div>
            <div className="space-y-2.5 flex-1">
              {goals.map(g => (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
                    goal === g.id
                      ? 'bg-indigo-600/20 border-indigo-500/50'
                      : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span className="text-2xl">{g.emoji}</span>
                  <div className="flex-1">
                    <p className={`font-semibold text-sm ${goal === g.id ? 'text-indigo-300' : 'text-zinc-100'}`}>{g.label}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">{g.desc}</p>
                  </div>
                  {goal === g.id && <Check size={16} className="text-indigo-400 flex-shrink-0" />}
                </button>
              ))}
            </div>
            <button
              onClick={() => goal && setStep(1)}
              disabled={!goal}
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-semibold py-4 rounded-2xl transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 1: Days */}
        {step === 1 && (
          <div className="flex-1 flex flex-col">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-zinc-100">How many days can you train?</h2>
              <p className="text-zinc-500 text-sm mt-2">Be realistic — consistency beats frequency every time.</p>
            </div>
            <div className="space-y-2.5 flex-1">
              {dayOptions.map(d => (
                <button
                  key={d.value}
                  onClick={() => setDays(d.value)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
                    days === d.value
                      ? 'bg-indigo-600/20 border-indigo-500/50'
                      : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-lg ${
                    days === d.value ? 'bg-indigo-500/20 text-indigo-300' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {d.value}
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold text-sm ${days === d.value ? 'text-indigo-300' : 'text-zinc-100'}`}>{d.label}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">{d.sub}</p>
                  </div>
                  {days === d.value && <Check size={16} className="text-indigo-400 flex-shrink-0" />}
                </button>
              ))}
            </div>
            <button
              onClick={() => days && setStep(2)}
              disabled={!days}
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-semibold py-4 rounded-2xl transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Equipment */}
        {step === 2 && (
          <div className="flex-1 flex flex-col">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-zinc-100">What equipment do you have?</h2>
              <p className="text-zinc-500 text-sm mt-2">We'll build your program around what's available.</p>
            </div>
            <div className="space-y-2.5 flex-1">
              {equipmentOptions.map(e => (
                <button
                  key={e.id}
                  onClick={() => setEquipment(e.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
                    equipment === e.id
                      ? 'bg-indigo-600/20 border-indigo-500/50'
                      : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span className="text-2xl">{e.emoji}</span>
                  <div className="flex-1">
                    <p className={`font-semibold text-sm ${equipment === e.id ? 'text-indigo-300' : 'text-zinc-100'}`}>{e.label}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">{e.sub}</p>
                  </div>
                  {equipment === e.id && <Check size={16} className="text-indigo-400 flex-shrink-0" />}
                </button>
              ))}
            </div>
            <button
              onClick={() => equipment && setStep(3)}
              disabled={!equipment}
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-semibold py-4 rounded-2xl transition-colors"
            >
              See my program
            </button>
          </div>
        )}

        {/* Step 3: Program recommendation */}
        {step === 3 && recommended && (
          <div className="flex-1 flex flex-col">
            <div className="mb-6">
              <p className="text-indigo-400 text-sm font-medium mb-1">Your program</p>
              <h2 className="text-2xl font-bold text-zinc-100">Here's what I recommend</h2>
              <p className="text-zinc-500 text-sm mt-2">Based on your goal and setup. You can always change this later.</p>
            </div>

            <div className="bg-indigo-950/60 border border-indigo-500/30 rounded-2xl p-5 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-zinc-100">{recommended.name}</h3>
                <p className="text-indigo-400 text-sm mt-0.5">{recommended.days}</p>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">{recommended.desc}</p>
              <div className="flex flex-wrap gap-2">
                {[
                  goals.find(g => g.id === goal)?.label,
                  dayOptions.find(d => d.value === days)?.label,
                  equipmentOptions.find(e => e.id === equipment)?.label,
                ].filter(Boolean).map(tag => (
                  <span key={tag} className="text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
              <p className="text-zinc-400 text-xs leading-relaxed">
                Your AI coach will set your starting weights based on your first session and adjust them weekly as you progress.
              </p>
            </div>

            <div className="flex-1" />

            <button
              onClick={() => setStep(4)}
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2"
            >
              Start training <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Step 4: Welcome */}
        {step === 4 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 text-4xl">
              🎯
            </div>
            <h2 className="text-2xl font-bold text-zinc-100">You're all set, {firstName}!</h2>
            <p className="text-zinc-500 text-sm mt-3 max-w-xs leading-relaxed">
              Your program is ready. Your coach will check in with you every session. Let's get to work.
            </p>

            <div className="mt-8 w-full space-y-2 text-left">
              {[
                '✓ Program assigned and ready',
                '✓ AI coach briefing set up',
                '✓ Progress tracking active',
              ].map(item => (
                <div key={item} className="bg-zinc-900 rounded-xl px-4 py-3">
                  <p className="text-zinc-300 text-sm">{item}</p>
                </div>
              ))}
            </div>

            <button
              onClick={onComplete}
              className="mt-8 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-4 rounded-2xl transition-colors"
            >
              Open Liftwise
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
