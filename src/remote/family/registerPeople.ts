import { collection, doc, setDoc } from 'firebase/firestore'
import { store } from '../firebase'
import { COLLECTION } from '@/components/constants'

export async function RegisterPeople(lists: any) {
  await setDoc(doc(collection(store, COLLECTION.PEOPLE)), lists)
}
