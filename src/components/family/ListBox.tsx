import { MissedPerson } from '@/model/register'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import ListRow from '../shared/ListRow'
import Image from 'next/image'
import { css } from '@emotion/react'
import Spacing from '../shared/Spacing'
import { useRouter } from 'next/router'

export default function ListBox({ list }: { list: MissedPerson }) {
  const router = useRouter()
  console.log(list)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        cursor: 'pointer',
      }}
      onClick={() => {
        router.push(`/familly/find/${list.id}`)
      }}
    >
      <Flex
        style={{
          marginLeft: '30px',
          width: '20%',
        }}
      >
        <Image src={list.img} width={100} height={100} alt="image" />
      </Flex>
      <Flex direction="row" style={{ marginLeft: '10px', width: '100%' }}>
        <Flex
          direction="column"
          style={{
            width: '30%',
          }}
        >
          <ListRow
            left={<Text css={TextStyle}>이름</Text>}
            contents={<Text css={TextStyle2}>{list.name}</Text>}
          />
          <ListRow
            left={<Text css={TextStyle}>성별</Text>}
            contents={
              <Text css={TextStyle2}>{list.sex === 'M' ? '남성' : '여성'}</Text>
            }
          />
        </Flex>
        <Flex
          direction="column"
          style={{
            width: '40%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <ListRow
            left={<Text css={TextStyle}>주소</Text>}
            contents={<Text css={TextStyle2}>{list.address}</Text>}
          />
          <ListRow
            left={<Text css={TextStyle}>실종위치</Text>}
            contents={<Text css={TextStyle2}>{list.LastAddress}</Text>}
            style={css`
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            `}
          />
        </Flex>
        <Spacing direction="horizontal" size={10} />
        <Flex
          direction="column"
          style={{
            width: '30%',
          }}
        >
          <ListRow
            left={<Text css={TextStyle}>실종일</Text>}
            contents={<Text css={TextStyle2}>{list.MissedDate}</Text>}
          />
          <ListRow
            left={<Text css={TextStyle}>나이</Text>}
            contents={<Text css={TextStyle2}>{list.age}</Text>}
          />
        </Flex>
      </Flex>
      <Image
        src={
          'https://cdn4.iconfinder.com/data/icons/navigation-40/24/chevron-right-256.png'
        }
        width={50}
        height={50}
        alt="Arrow"
      />
    </div>
  )
}

const TextStyle = css`
  font-size: 15px;
  font-weight: bold;
`
const TextStyle2 = css`
  font-size: 15px;
  font-weight: bold;
  margin-left: 10px;
`

const ListRowContainter = css`
  width: 100%;
  height: 100%;
`
