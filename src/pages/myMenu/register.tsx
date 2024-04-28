import SideMenu from '@/components/myMenu/SideMenu'
import withAuth from '@/components/shared/hooks/withAuth'

function RegisterPage() {
  return (
    <div>
      <SideMenu />
      Register Page
    </div>
  )
}

export default withAuth(RegisterPage)
