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
    <div className="w-12 h-6 float-right flex items-center justify-between">
      <ModeToggle />
      <LogOutIcon className="cursor-pointer" onClick={logout} size={16} />
    </div>
  )
}

export default Header