import { ModeToggle } from '@/components/mode-toggle'
import { LogOutIcon } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { OpenTabs } from '@/components'
import { useOpenMenuStore } from '@/store/open-top-tabs'
import { Breadcrumb } from '@/components'

const Header = () => {
  const navigate = useNavigate()
  const { cleanOpenMenu } = useOpenMenuStore()
  const { pathname } = useLocation()
  const logout = () => {
    localStorage.removeItem('token')
    cleanOpenMenu()
    const url = encodeURIComponent(pathname)
    navigate({ pathname: '/login', search: '?redirect=' + url })
  }
  return (
    <div className='border-b border-b-gray-100 dark:border-b-gray-800'>
      <div className='h-10 flex items-center justify-between space-x-8 bg-gray-50 dark:bg-gray-900'>
        <OpenTabs />
        <div className='flex w-14 justify-between pr-2'>
          <ModeToggle />
          <LogOutIcon className='cursor-pointer' onClick={logout} size={16} />
        </div>
      </div>
      <Breadcrumb />
    </div>
  )
}

export default Header
