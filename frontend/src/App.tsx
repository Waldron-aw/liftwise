import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Today from './pages/Today'
import ActiveSession from './pages/ActiveSession'
import History from './pages/History'
import Progress from './pages/Progress'
import Exercises from './pages/Exercises'
import BodyStats from './pages/BodyStats'
import Profile from './pages/Profile'
import Login from './pages/Login'

export default function App() {
  const isLoggedIn = true // TODO: real auth

  if (!isLoggedIn) return <Login />

  return (
    <BrowserRouter>
      <Routes>
        {/* Full-screen routes — no bottom nav */}
        <Route path="/session/:id" element={<ActiveSession />} />

        {/* Shell routes — with bottom nav */}
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/today" replace />} />
          <Route path="/today" element={<Today />} />
          <Route path="/history" element={<History />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/stats" element={<BodyStats />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
