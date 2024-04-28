import { PEOPLE_LIST } from '@/mock/list'
import { store } from '@/remote/firebase'
import { collection, doc, writeBatch } from 'firebase/firestore'
import { COLLECTION } from '../constants'
import Button from '../shared/Button'
import { RegisterPeople } from '@/remote/myMenu/registerPeople'

export default function PeopleListAddBtn() {
  const handleBtnClick = () => {
    const batch = writeBatch(store)
    const peopleList = PEOPLE_LIST.map((list) => {
      return {
        ...list,
      }
    })

    peopleList.forEach((list) => {
      const docRef = doc(collection(store, COLLECTION.PEOPLE))
      batch.set(docRef, list)
    })
    batch
      .commit()
      .then(() => {
        console.log('등록 완료')
        alert('등록 완료')
      })
      .catch((error) => {
        console.error('등록 실패', error)
        alert('등록 실패')
      })
  }
  return <Button onClick={handleBtnClick}>실종자 등록하기</Button>
}
