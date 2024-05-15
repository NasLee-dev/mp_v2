import { getNotice } from '@/remote/community/getNotice'
import { useQuery } from 'react-query'

export default function useGetNotice(id: string) {
  return useQuery('notice', async () => {
    await getNotice(id)
  })
}
