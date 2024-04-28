import {
  QuerySnapshot,
  collection,
  getDocs,
  limit,
  query,
  startAfter,
} from 'firebase/firestore'
import { store } from '../firebase'
import { COLLECTION } from '@/components/constants'
import { Register } from '@/model/register'

export async function getPeopleList(pageParams?: QuerySnapshot<any>) {
  const listQuery =
    pageParams == null
      ? query(collection(store, COLLECTION.PEOPLE), limit(10))
      : query(
          collection(store, COLLECTIONS.PEOPLE),
          startAfter(pageParams, limit(10)),
        )
  const listsSnapShot = await getDocs(listQuery)
  const lists = listsSnapShot.docs.map(
    (doc) =>
      ({
        ...doc.data(),
      }) as Register,
  )
  const lastVisible = listsSnapShot.docs[listsSnapShot.docs.length - 1]
  return {
    lists,
    lastVisible,
  }
}
