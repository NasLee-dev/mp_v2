import ListBox from '@/components/family/ListBox'
import SideMenu from '@/components/family/SideMenu'
import Flex from '@/components/shared/Flex'
import Input from '@/components/shared/Input'
import Text from '@/components/shared/Text'
import Top from '@/components/shared/Top'
import withAuth from '@/components/shared/hooks/withAuth'
import { MissedPerson } from '@/model/register'
import { getPeopleList } from '@/remote/family/getPeopleList'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import { Fragment, useCallback } from 'react'
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
        <Top title="실종자 찾기" subTitle="실종자 이름을 검색해주세요" />
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
              router.push('/familly/find/ListSearch')
            }}
          />
        </Flex>
        <InfiniteScroll
          dataLength={lists?.length ?? 0}
          hasMore={hasNextPage}
          loader={<></>}
          next={loadMore}
          scrollThreshold="100px"
        >
          <ul>
            {lists.map((list: MissedPerson) => (
              <Fragment key={list.id}>
                <Flex
                  style={{
                    border: '1px solid gray',
                    width: '50vw',
                    height: '200px',
                    borderRadius: '10px',
                    marginBottom: '10px',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <ListBox list={list} />
                </Flex>
              </Fragment>
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
  overflow: 'hidden';
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
