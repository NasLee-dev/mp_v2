import Button from '@/components/shared/Button'
import PeopleListAddBtn from '@/components/test/PeopleListAddBtn'
import { PEOPLE_LIST } from '@/mock/list'
import { RegisterPeople } from '@/remote/myMenu/registerPeople'

export default function Test() {
  const listData = PEOPLE_LIST.map((list) => list)
  console.log(listData)

  return (
    <div>
      <PeopleListAddBtn />
    </div>
  )
}
