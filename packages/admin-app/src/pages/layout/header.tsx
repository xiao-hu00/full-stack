import { ModeToggle } from '@/components/mode-toggle'
import { LogOutIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { OpenTabs } from '@/components'

const Header = () => {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('pathname')
    navigate('/login')
  }
  return (
    <div className="h-14 flex items-center justify-between space-x-8">
      <OpenTabs />
      <div className='flex w-14 justify-between pr-2'>
        <ModeToggle />
        <LogOutIcon className="cursor-pointer" onClick={logout} size={16} />
      </div>
    </div>
  )
}

export default Header