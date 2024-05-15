import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { store } from '../firebase'
import { COLLECTION } from '@/components/constants'

export async function getDetail(id: string) {
  const condition = query(
    collection(store, COLLECTION.PEOPLE),
    where('id', '==', parseInt(id)),
  )
  const snapshot = await getDocs(condition)
  const data = snapshot.docs.map((doc) => doc.data())
  return {
    ...data[0],
  }
}
