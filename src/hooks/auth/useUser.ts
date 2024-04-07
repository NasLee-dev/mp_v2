import { userAtom } from '@/store/atom/user'
import { useRecoilValue } from 'recoil'

export default function useUser() {
  return useRecoilValue(userAtom)
}
