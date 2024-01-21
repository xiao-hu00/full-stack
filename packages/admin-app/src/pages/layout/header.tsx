import { ModeToggle } from '@/components/mode-toggle'
import { LogOutIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('pathname')
    navigate('/login')
  }
  return (
    <div className="w-20 float-right flex items-center justify-between">
      <LogOutIcon className="cursor-pointer" onClick={logout} />
      <ModeToggle />
    </div>
  )
}

export default Header