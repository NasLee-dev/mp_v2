import { collection, doc, setDoc } from 'firebase/firestore'
import { store } from '../firebase'
import { COLLECTION } from '@/components/constants'

export const postWriting = async (formData: any) => {
  await setDoc(doc(collection(store, COLLECTION.COMMUNITY)), formData)
}
