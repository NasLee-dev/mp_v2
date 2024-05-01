import ListBox from '@/components/myMenu/ListBox'
import SideMenu from '@/components/myMenu/SideMenu'
import Flex from '@/components/shared/Flex'
import Input from '@/components/shared/Input'
import Text from '@/components/shared/Text'
import withAuth from '@/components/shared/hooks/withAuth'
import { MissedPerson } from '@/model/register'
import { getPeopleList } from '@/remote/myMenu/getPeopleList'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { QueryClient, dehydrate, useInfiniteQuery } from 'react-query'

function FindPage() {
  const router = useRouter()
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(['list'], ({ pageParam }) => getPeopleList(pageParam), {
    getNextPageParam: (lastPage) => {
      return lastPage.lastVisible
    },
  })

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }
    fetchNextPage()
  }, [hasNextPage, isFetching, fetchNextPage])
  if (data == null) {
    return <div>로딩중</div>
  }

  const lists = data?.pages.map((page) => page.lists).flat()
  return (
    <Flex
      style={{
        flexDirection: 'row',
      }}
    >
      <SideMenu />
      <Flex css={ContainerStyle}>
        <Flex
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: '25px',
            marginBottom: '25px',
          }}
        >
          <Text css={TitleStyle}>실종자 찾기</Text>
        </Flex>
        <Flex
          style={{
            width: '50vw',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <Input
            onFocus={() => {
              router.push('/familly/ListSearch')
            }}
          />
        </Flex>
        <InfiniteScroll
          dataLength={lists?.length}
          hasMore={hasNextPage}
          loader={<h4>Loading...</h4>}
          next={loadMore}
        >
          <ul>
            {lists.map((list: MissedPerson) => (
              <Flex
                key={list.id}
                style={{
                  border: '1px solid gray',
                  width: '50vw',
                  height: '200px',
                  borderRadius: '10px',
                  marginBottom: '10px',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  overflow: 'hidden',
                }}
              >
                <ListBox list={list} />
              </Flex>
            ))}
          </ul>
        </InfiniteScroll>
      </Flex>
    </Flex>
  )
}

const ContainerStyle = css`
  display: flex;
  flex-direction: column;
  width: calc(100% - 200px);
  height: calc(100vh - 65px);
  position: relative;
  left: 200px;
  top: 0px;
  z-index: 1;
  justify-content: start;
  align-items: center;
`

const TitleStyle = css`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
`

export async function getServerSideProps() {
  const client = new QueryClient()
  await client.prefetchInfiniteQuery(['list'], () => getPeopleList())
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
    },
  }
}

export default withAuth(FindPage)
