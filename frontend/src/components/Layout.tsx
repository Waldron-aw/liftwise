import { useState } from 'react'
import { Outlet, NavLink, useOutletContext } from 'react-router-dom'
import { Home, History, TrendingUp, Dumbbell, User, MessageCircle } from 'lucide-react'
import ChatDrawer from './ChatDrawer'

const nav = [
  { to: '/today', icon: Home, label: 'Today' },
  { to: '/history', icon: History, label: 'History' },
  { to: '/progress', icon: TrendingUp, label: 'Progress' },
  { to: '/exercises', icon: Dumbbell, label: 'Exercises' },
  { to: '/profile', icon: User, label: 'Profile' },
]

export type LayoutContext = { openChat: () => void }

export default function Layout() {
  const [chatOpen, setChatOpen] = useState(false)
  // Unread dot clears once chat is opened for the first time today
  const [hasUnread, setHasUnread] = useState(true)

  const openChat = () => {
    setChatOpen(true)
    setHasUnread(false)
  }

  return (
    <div className="flex flex-col min-h-svh max-w-md mx-auto w-full">
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet context={{ openChat } satisfies LayoutContext} />
      </main>

      {/* Floating chat button */}
      <button
        onClick={openChat}
        className="fixed bottom-24 right-4 z-40 flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-lg shadow-indigo-900/50 transition-colors"
        style={{ width: 52, height: 52 }}
      >
        <MessageCircle size={22} />
        {hasUnread && (
          <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-rose-500 rounded-full border-2 border-zinc-950" />
        )}
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
