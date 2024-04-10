import { userAtom } from '@/store/atom/user'
import { useSession } from 'next-auth/react'
import { useRecoilValue } from 'recoil'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const user = useRecoilValue(userAtom)
  const { data, status } = useSession()
  if (status === 'loading' && user?.email === '') return null
  return <>{children}</>
}
