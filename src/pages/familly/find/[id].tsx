import SideMenu from '@/components/family/SideMenu'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import Top from '@/components/shared/Top'
import { MissedPerson } from '@/model/register'
import { getDetail } from '@/remote/family/getDetail'
import { css } from '@emotion/react'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'

interface ListDetailPageProps {
  initialData: MissedPerson
}

export default function ListDetailPage({ initialData }: ListDetailPageProps) {
  console.log(initialData)
  return (
    <div
      style={{
        flexDirection: 'row',
      }}
    >
      <SideMenu />
      <Top title={`${initialData.name}님의 상세정보`} subTitle="" />
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
        ></Flex>
        <Flex
          direction="column"
          style={{
            width: '800px',
            height: '800px',
            justifyContent: 'start',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Spacing size={20} />
          <Flex
            direction="row"
            justify="center"
            align="start"
            style={{
              gap: '20px',
            }}
          >
            <Flex
              direction="column"
              style={{
                width: '200px',
              }}
            >
              <Image
                src={initialData.img}
                alt="image"
                width={200}
                height={200}
              />
            </Flex>
            <Flex direction="column">
              <Flex
                direction="row"
                style={{
                  gap: '20px',
                }}
              ></Flex>
              <Spacing size={10} />
              <Flex
                direction="row"
                style={{
                  width: '100%',
                  gap: '20px',
                }}
              >
                <Flex direction="column">
                  <Text
                    typography="t7"
                    display="inline-block"
                    style={{ marginBottom: 6 }}
                  >
                    실종 일자
                  </Text>
                </Flex>
                <Flex direction="column"></Flex>
              </Flex>
              <Spacing size={10} />
              <Text
                typography="t7"
                display="inline-block"
                style={{ marginBottom: 6 }}
              >
                실종 주소
              </Text>
            </Flex>
          </Flex>
          <Spacing size={20} />
          <Flex
            style={{
              marginLeft: '10px',
            }}
          ></Flex>
          <Spacing size={20} />
          <Flex
            style={{
              width: '780px',
            }}
          ></Flex>
        </Flex>
      </Flex>
    </div>
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context
  const id = query.id as string
  const missedPerson = await getDetail(id)
  return {
    props: {
      initialData: missedPerson,
    },
  }
}
