import { store } from '@/remote/firebase'
import { collection, doc, writeBatch } from 'firebase/firestore'
import { NOTICE_LIST } from '@/mock/notice'
import { COLLECTION } from '../constants'
import Button from '../shared/Button'

export default function NoticeAddBtn() {
  const handleBtnClick = () => {
    const batch = writeBatch(store)
    const peopleList = NOTICE_LIST.map((list) => {
      return {
        ...list,
      }
    })

    peopleList.forEach((list) => {
      const docRef = doc(collection(store, COLLECTION.NOTICE))
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
  return <Button onClick={handleBtnClick}>공지사항 등록하기</Button>
}
