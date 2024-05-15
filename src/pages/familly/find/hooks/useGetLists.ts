import { getPeopleList } from '@/remote/family/getPeopleList'
import { useQuery } from 'react-query'

export default function useGetLists() {
  const snapshot = useQuery(['getLists'], async () => {
    await getPeopleList()
  })
  return snapshot
}
