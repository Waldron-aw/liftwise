import { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { Home, History, TrendingUp, Dumbbell, User, MessageCircle } from 'lucide-react'
import ChatDrawer from './ChatDrawer'

const nav = [
  { to: '/today', icon: Home, label: 'Today' },
  { to: '/history', icon: History, label: 'History' },
  { to: '/progress', icon: TrendingUp, label: 'Progress' },
  { to: '/exercises', icon: Dumbbell, label: 'Exercises' },
  { to: '/profile', icon: User, label: 'Profile' },
]

export default function Layout() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-svh max-w-md mx-auto w-full">
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Floating chat button */}
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-24 right-4 z-40 w-13 h-13 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-lg shadow-indigo-900/50 flex items-center justify-center transition-colors"
        style={{ width: 52, height: 52 }}
      >
        <MessageCircle size={22} />
      </button>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-zinc-900 border-t border-zinc-800 z-50">
        <div className="flex items-center justify-around py-2 px-4">
          {nav.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-colors ${
                  isActive ? 'text-indigo-400' : 'text-zinc-500'
                }`
              }
            >
              <Icon size={22} strokeWidth={1.8} />
              <span className="text-[10px] font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {chatOpen && <ChatDrawer onClose={() => setChatOpen(false)} />}
    </div>
  )
}
