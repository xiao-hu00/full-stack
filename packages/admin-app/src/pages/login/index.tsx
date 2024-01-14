import { Button } from "@/components/ui/button"
import { useState } from 'react'
import ClassNames from 'classnames'
import { Loader2 } from "lucide-react"
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const login = () => {
    setLoading(true)
    setTimeout(() => {
      localStorage.removeItem('pathname')
      localStorage.setItem('token', '123123')
      navigate('/home')
      setLoading(false)
    }, 1500)
  }
  return (
    <div>
      <div>Login</div>
      <Button onClick={login} disabled={loading} className="ml-2 w-40">
        <Loader2 className={ClassNames('mr-2 h-4 w-4', { 'animate-spin': loading, 'hidden': !loading })} />
        登录
      </Button>
    </div>
  )
}

export default Login