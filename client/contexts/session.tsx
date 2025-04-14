import { createContext, type ReactNode, useState } from 'react'

interface SessionContextType {
  // eslint-disable-next-line no-undef
  session?: Partial<User>
  setSession: (session: Partial<User>) => void
}
export const SessionContext = createContext<SessionContextType>({
  session: undefined,
  setSession: () => {}
})

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Partial<User> | undefined>(undefined)

  const newSession = (session: Partial<User>) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setSession(oldSession => ({ ...oldSession, ...session }))
  }

  return (
    <SessionContext.Provider
      value={{
        session,
        setSession: newSession
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}
