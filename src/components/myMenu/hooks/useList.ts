import { getPeopleList } from '@/remote/myMenu/getPeopleList'
import { useQuery } from 'react-query'

export default function useList() {
  return useQuery(['list'], async () => getPeopleList())
}
