import { useSession } from 'next-auth/react'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data, status } = useSession()
  if (status === 'loading') return null
  return <>{children}</>
}
