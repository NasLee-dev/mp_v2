import { userAtom } from '@/store/atom/user'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ComponentType } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

function withAuth<Props = Record<string, never>>(
  WrappedComponent: ComponentType<Props>,
) {
  return function AuthenticatedComponent(props: Props) {
    const router = useRouter()
    const user = useRecoilValue(userAtom)
    const { data, status } = useSession()
    if (status !== 'loading' && data == null && user?.email === '') {
      router.replace('/signin')
      return null
    }
    return <WrappedComponent {...(props as any)} />
  }
}

export default withAuth
