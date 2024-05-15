import { Notice } from '@/model/notice'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import { colors } from '@/styles/colorPalette'

interface MiniNoticeProps {
  notices: Notice[]
}

export default function MiniNotice({ notices }: MiniNoticeProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '500px',
      }}
    >
      {notices.map((notice) => (
        <div
          key={notice.id}
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            cursor: 'pointer',
          }}
        >
          <Flex
            style={{
              width: '30px',
              height: '25px',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              backgroundColor: colors.blue980,
              borderRadius: '5px',
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: '12px',
              }}
              bold={true}
            >
              공지
            </Text>
          </Flex>
          <Text
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            {notice.title}
          </Text>
        </div>
      ))}
    </div>
  )
}
