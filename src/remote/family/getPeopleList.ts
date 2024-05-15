import {
  QuerySnapshot,
  collection,
  getDocs,
  limit,
  query,
  startAfter,
  where,
} from 'firebase/firestore'
import { store } from '../firebase'
import { COLLECTION } from '@/components/constants'
import { MissedPerson } from '@/model/register'

export async function getPeopleList(pageParams?: QuerySnapshot<MissedPerson>) {
  const listQuery =
    pageParams == null
      ? query(collection(store, COLLECTION.PEOPLE), limit(10))
      : query(
          collection(store, COLLECTION.PEOPLE),
          startAfter(pageParams, limit(10)),
        )
  const listsSnapShot = await getDocs(listQuery)
  const lists = listsSnapShot.docs.map(
    (doc) =>
      ({
        ...doc.data(),
      }) as MissedPerson,
  )
  const lastVisible = listsSnapShot.docs[listsSnapShot.docs.length - 1]
  return {
    lists,
    lastVisible,
  }
}

export async function getPeopleListByKeyword(keyword: string) {
  const searchQuery = query(
    collection(store, COLLECTION.PEOPLE),
    where('name', '>=', keyword),
    where('name', '<=', keyword + '\uf8ff'),
  )
  const listsSnapShot = await getDocs(searchQuery)
  return listsSnapShot.docs.map(
    (doc) =>
      ({
        ...doc.data(),
      }) as MissedPerson,
  )
}

export async function getPeopleListLength() {
  const listsSnapShot = await getDocs(collection(store, COLLECTION.PEOPLE))
  return listsSnapShot.docs.length
}
