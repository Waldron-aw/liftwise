import { useState, useRef, useEffect } from 'react'
import { X, Send, ChevronRight, Check } from 'lucide-react'

type Message =
  | { role: 'user'; text: string }
  | { role: 'ai'; text: string }
  | { role: 'ai'; type: 'proposal'; text: string; proposal: ProgramProposal }

interface ProgramChange {
  day: string
  exercise: string
  field: string
  from: string
  to: string
}

interface ProgramProposal {
  summary: string
  changes: ProgramChange[]
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: 'ai',
    text: "Hey! I know your program and your recent sessions. Tell me what you want to change, how you're feeling, or ask me anything about your training.",
  },
]

const MOCK_CONVERSATION: Record<string, Message[]> = {
  "i want more back thickness work, my lats are lagging": [
    {
      role: 'ai',
      text: "Makes sense — your Pull days are currently light on horizontal pulling. I'd add a heavy barbell row early in Pull A and swap the cable row for a chest-supported row to reduce lower back fatigue. Here's what that looks like:",
    },
    {
      role: 'ai',
      type: 'proposal',
      text: '',
      proposal: {
        summary: '3 changes to Pull A',
        changes: [
          { day: 'Pull A', exercise: 'Barbell Row', field: 'position', from: 'Exercise 3', to: 'Exercise 1 (moved up)' },
          { day: 'Pull A', exercise: 'Barbell Row', field: 'sets × reps', from: '3 × 10', to: '4 × 6' },
          { day: 'Pull A', exercise: 'Cable Row', field: 'exercise', from: 'Cable Row', to: 'Chest-Supported Row' },
        ],
      },
    },
  ],
  "my shoulder is sore, can we deload this week": [
    {
      role: 'ai',
      text: "Good call catching it early. I'll drop all pushing volume by 40% this week and remove overhead pressing entirely — your shoulder needs horizontal plane rest most. Pull and legs stay the same.",
    },
    {
      role: 'ai',
      type: 'proposal',
      text: '',
      proposal: {
        summary: 'Deload week — Push days only',
        changes: [
          { day: 'Push A', exercise: 'Bench Press', field: 'sets × reps', from: '4 × 5 @ 82.5kg', to: '3 × 5 @ 65kg' },
          { day: 'Push A', exercise: 'Overhead Press', field: 'exercise', from: 'Overhead Press (3 × 8)', to: 'Removed this week' },
          { day: 'Push A', exercise: 'Incline DB Press', field: 'sets × reps', from: '3 × 10-12 @ 30kg', to: '2 × 10 @ 22.5kg' },
          { day: 'Push B', exercise: 'All exercises', field: 'volume', from: '100%', to: '60% (deload)' },
        ],
      },
    },
  ],
}

function ProposalCard({
  proposal,
  onApply,
  onDiscard,
  applied,
}: {
  proposal: ProgramProposal
  onApply: () => void
  onDiscard: () => void
  applied: boolean | null
}) {
  return (
    <div className="rounded-2xl overflow-hidden border border-indigo-500/30 bg-zinc-900 my-1">
      <div className="px-4 py-3 bg-indigo-500/10 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-indigo-400" />
        <p className="text-indigo-300 text-sm font-semibold">Proposed change — {proposal.summary}</p>
      </div>

      <div className="divide-y divide-zinc-800">
        {proposal.changes.map((c, i) => (
          <div key={i} className="px-4 py-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-zinc-500 text-xs">{c.day}</span>
              <ChevronRight size={10} className="text-zinc-600" />
              <span className="text-zinc-300 text-xs font-medium">{c.exercise}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-rose-400 line-through text-xs">{c.from}</span>
              <span className="text-zinc-600 text-xs">→</span>
              <span className="text-emerald-400 text-xs font-medium">{c.to}</span>
            </div>
          </div>
        ))}
      </div>

      {applied === null && (
        <div className="flex gap-2 px-4 py-3 border-t border-zinc-800">
          <button
            onClick={onApply}
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
          >
            Apply to my program
          </button>
          <button
            onClick={onDiscard}
            className="px-4 text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
          >
            Discard
          </button>
        </div>
      )}

      {applied === true && (
        <div className="flex items-center gap-2 px-4 py-3 border-t border-zinc-800">
          <Check size={14} className="text-emerald-400" />
          <span className="text-emerald-400 text-sm font-medium">Applied to your program</span>
        </div>
      )}

      {applied === false && (
        <div className="flex items-center gap-2 px-4 py-3 border-t border-zinc-800">
          <X size={14} className="text-zinc-500" />
          <span className="text-zinc-500 text-sm">Discarded</span>
        </div>
      )}
    </div>
  )
}

export default function ChatDrawer({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [proposalStates, setProposalStates] = useState<Record<number, boolean | null>>({})
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')

    const userMsg: Message = { role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    setTimeout(() => {
      const key = Object.keys(MOCK_CONVERSATION).find(k =>
        text.toLowerCase().includes(k.split(' ')[0]) ||
        text.toLowerCase().includes(k.split(' ')[1] || '')
      )
      const replies: Message[] = key
        ? MOCK_CONVERSATION[key]
        : [{ role: 'ai', text: "Got it. Let me look at your program and recent sessions... I'll suggest a change shortly." }]

      setMessages(prev => [...prev, ...replies])
      setLoading(false)
    }, 1200)
  }

  const handleProposal = (msgIdx: number, applied: boolean) => {
    setProposalStates(prev => ({ ...prev, [msgIdx]: applied }))
    if (applied) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { role: 'ai', text: "Done — your program is updated. You'll see the changes next time you open that day." },
        ])
      }, 400)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-zinc-950 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-14 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-zinc-100 font-semibold">AI Coach</h2>
          <p className="text-zinc-500 text-xs mt-0.5">Ask anything · tweak your program</p>
        </div>
        <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 transition-colors">
          <X size={22} />
        </button>
      </div>

      {/* Suggested prompts */}
      {messages.length === 1 && (
        <div className="px-4 pt-3 flex flex-wrap gap-2">
          {[
            'My shoulder is sore, can we deload this week',
            'I want more back thickness work, my lats are lagging',
            'Add a rest day on Wednesday',
          ].map(prompt => (
            <button
              key={prompt}
              onClick={() => { setInput(prompt); }}
              className="text-xs bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 px-3 py-1.5 rounded-full transition-colors text-left"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, i) => {
          if (msg.role === 'user') {
            return (
              <div key={i} className="flex justify-end">
                <div className="bg-indigo-600 text-white text-sm px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[80%]">
                  {msg.text}
                </div>
              </div>
            )
          }

          if ('type' in msg && msg.type === 'proposal') {
            return (
              <ProposalCard
                key={i}
                proposal={msg.proposal}
                applied={proposalStates[i] ?? null}
                onApply={() => handleProposal(i, true)}
                onDiscard={() => handleProposal(i, false)}
              />
            )
          }

          return (
            <div key={i} className="flex justify-start">
              <div className="bg-zinc-900 text-zinc-200 text-sm px-4 py-2.5 rounded-2xl rounded-tl-sm max-w-[85%] leading-relaxed">
                {msg.text}
              </div>
            </div>
          )
        })}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-zinc-900 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 pb-8 pt-3 border-t border-zinc-800 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Message your coach..."
          className="flex-1 bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <button
          onClick={send}
          disabled={!input.trim() || loading}
          className="w-11 h-11 flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white rounded-2xl transition-colors flex-shrink-0"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  )
}
