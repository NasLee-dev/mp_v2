import Flex from '@/components/shared/Flex'
import withAuth from '@/components/shared/hocs/withAuth'

function Mymenu() {
  return (
    <Flex>
      <h1>My Menu</h1>
    </Flex>
  )
}

export default withAuth(Mymenu)
