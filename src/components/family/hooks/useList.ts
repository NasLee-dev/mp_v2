import { getPeopleList } from '@/remote/family/getPeopleList'
import { useQuery } from 'react-query'

export default function useList() {
  return useQuery(['list'], async () => getPeopleList())
}
