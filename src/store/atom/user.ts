import { User } from '@/model/user'
import { atom } from 'recoil'
import { v4 } from 'uuid'

export const userAtom = atom<User | null>({
  key: `auth/user/${v4()}`,
  default: {
    uid: '',
    email: '',
    photoURL: '',
    displayName: '',
  },
})
