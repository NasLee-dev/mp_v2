import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { store } from '../firebase'
import { COLLECTION } from '@/components/constants'

export const getNotice = async (id: string) => {
  const getTwoNotices = query(
    collection(store, COLLECTION.NOTICE),
    where('id', '<=', parseInt(id)),
    limit(2),
  )
  const snapshot = await getDocs(getTwoNotices)
  return snapshot
}

export const getNotices = async () => {
  const listQuery = query(
    collection(store, COLLECTION.NOTICE),
    orderBy('id', 'desc'),
  )
  const snapshot = await getDocs(listQuery)
  return snapshot
}
