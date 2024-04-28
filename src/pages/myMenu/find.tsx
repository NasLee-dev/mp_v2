import SideMenu from '@/components/myMenu/SideMenu'
import useList from '@/components/myMenu/hooks/useList'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import { Register } from '@/model/register'
import { getPeopleList } from '@/remote/myMenu/getPeopleList'
import { css } from '@emotion/react'
import { getDocs } from 'firebase/firestore'
import { GetServerSidePropsContext } from 'next'
import { dehydrate } from 'react-query'

function FindPage({ lists }: any) {
  console.log(lists)
  return (
    <Flex>
      <SideMenu />
      <Flex css={ContainerStyle}>
        <Spacing size={20} />
        <Flex
          style={{
            width: '30%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '150px',
            borderRadius: '10px',
            display: 'flex',
          }}
        >
          <Text css={TitleStyle}>실종자 리스트</Text>
        </Flex>
        <Flex
          style={{
            width: '95%',
            height: '100%',
            flexDirection: 'column',
          }}
        >
          {lists.map((list: Register) => (
            <Flex
              key={list.id}
              style={{
                border: '1px solid gray',
                width: '100%',
                height: '150px',
                borderRadius: '10px',
                marginBottom: '10px',
              }}
            >
              <Flex
                style={{
                  width: '100%',
                  height: '100%',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text>{list.name}</Text>
                <Text>{list.age}</Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}

const ContainerStyle = css`
  display: flex;
  flex-direction: column;
  width: calc(100% - 200px);
  height: calc(100vh - 60px);
  position: absolute;
  left: 200px;
  top: 60px;
  z-index: 1;
  justify-content: start;
  align-items: center;
`

const TitleStyle = css`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
`

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { lists } = await getPeopleList() // Destructure the 'lists' property instead of 'data'
  console.log(lists)
  return {
    props: {
      lists,
    },
  }
}

export default FindPage
