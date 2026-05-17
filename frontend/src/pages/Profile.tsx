import { useNavigate } from 'react-router-dom'
import { Scale, ChevronRight, Bell, Shield, LogOut, MessageSquare } from 'lucide-react'

export default function Profile() {
  const navigate = useNavigate()

  return (
    <div className="px-4 pt-6 pb-4 space-y-6">
      {/* User card */}
      <div className="bg-zinc-900 rounded-2xl p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
          <span className="text-indigo-400 text-xl font-bold">AW</span>
        </div>
        <div>
          <p className="text-zinc-100 font-semibold text-lg">Alex Waldron</p>
          <p className="text-zinc-500 text-sm">PPL Strength · Week 8</p>
        </div>
      </div>

      {/* Program */}
      <div className="space-y-2">
        <h2 className="text-zinc-500 text-xs font-medium uppercase tracking-wide px-1">Program</h2>
        <div className="bg-zinc-900 rounded-2xl divide-y divide-zinc-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 rounded-t-2xl transition-colors text-left">
            <div className="flex-1">
              <p className="text-zinc-100 text-sm font-medium">PPL Strength</p>
              <p className="text-zinc-500 text-xs mt-0.5">Active program</p>
            </div>
            <ChevronRight size={16} className="text-zinc-600" />
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 rounded-b-2xl transition-colors text-left">
            <MessageSquare size={16} className="text-zinc-500" />
            <div className="flex-1">
              <p className="text-zinc-100 text-sm font-medium">Customise with AI</p>
              <p className="text-zinc-500 text-xs mt-0.5">Tell Claude what to change</p>
            </div>
            <ChevronRight size={16} className="text-zinc-600" />
          </button>
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-2">
        <h2 className="text-zinc-500 text-xs font-medium uppercase tracking-wide px-1">Settings</h2>
        <div className="bg-zinc-900 rounded-2xl divide-y divide-zinc-800">
          {[
            { icon: Scale, label: 'Units', value: 'Metric (kg)' },
            { icon: Bell, label: 'Notifications', value: 'On' },
            { icon: Shield, label: 'Privacy', value: '' },
          ].map(({ icon: Icon, label, value }) => (
            <button key={label} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 first:rounded-t-2xl last:rounded-b-2xl transition-colors text-left">
              <Icon size={16} className="text-zinc-500" />
              <span className="text-zinc-100 text-sm flex-1">{label}</span>
              {value && <span className="text-zinc-500 text-sm">{value}</span>}
              <ChevronRight size={16} className="text-zinc-600" />
            </button>
          ))}
        </div>
      </div>

      {/* Stats summary */}
      <div className="space-y-2">
        <h2 className="text-zinc-500 text-xs font-medium uppercase tracking-wide px-1">All time</h2>
        <div className="bg-zinc-900 rounded-2xl divide-y divide-zinc-800">
          {[
            { label: 'Total sessions', value: '47' },
            { label: 'Total volume', value: '198t' },
            { label: 'Member since', value: 'Oct 2024' },
          ].map(s => (
            <div key={s.label} className="flex items-center justify-between px-4 py-3">
              <p className="text-zinc-400 text-sm">{s.label}</p>
              <p className="text-zinc-100 font-medium text-sm">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 text-rose-400 hover:text-rose-300 py-3 transition-colors">
        <LogOut size={16} />
        <span className="text-sm font-medium">Sign out</span>
      </button>
    </div>
  )
}
