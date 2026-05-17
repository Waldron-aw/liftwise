import { useState } from 'react'
import Landing from './Landing'
import InviteCode from './InviteCode'
import CreateAccount from './CreateAccount'
import Onboarding from './Onboarding'

export type AuthScreen = 'landing' | 'invite' | 'create' | 'onboarding'

export interface SignupData {
  inviteCode: string
  name: string
  email: string
}

interface Props {
  onComplete: () => void
}

export default function AuthFlow({ onComplete }: Props) {
  const [screen, setScreen] = useState<AuthScreen>('landing')
  const [data, setData] = useState<Partial<SignupData>>({})

  if (screen === 'landing') {
    return (
      <Landing
        onSignIn={onComplete}
        onInvite={() => setScreen('invite')}
      />
    )
  }

  if (screen === 'invite') {
    return (
      <InviteCode
        onBack={() => setScreen('landing')}
        onValid={(code) => {
          setData(d => ({ ...d, inviteCode: code }))
          setScreen('create')
        }}
      />
    )
  }

  if (screen === 'create') {
    return (
      <CreateAccount
        onBack={() => setScreen('invite')}
        onComplete={(name, email) => {
          setData(d => ({ ...d, name, email }))
          setScreen('onboarding')
        }}
      />
    )
  }

  return <Onboarding name={data.name || 'there'} onComplete={onComplete} />
}
