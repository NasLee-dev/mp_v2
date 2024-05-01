import { collection, doc, setDoc } from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTION } from '@/components/constants'

export default async function RegistPeople(data: any) {
  await setDoc(doc(collection(store, COLLECTION.PEOPLE)), data)
}
