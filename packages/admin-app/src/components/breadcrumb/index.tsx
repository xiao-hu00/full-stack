import { cn } from '@/lib/utils'
import { ChevronRight, Search } from 'lucide-react'
import { menuList } from '@/router/router-list'
import { motion } from 'framer-motion'
import { ModeToggle } from '@/components/mode-toggle'
import { LogOutIcon } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useOpenMenuStore } from '@/store/open-top-tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '../ui/input'
interface PropsType {
  className?: string
}

const Breadcrumb = ({ className }: PropsType) => {
  const { pathname } = useLocation()
  const keys = pathname.split('/').filter(m => !!m)
  const navigate = useNavigate()
  const { cleanOpenMenu } = useOpenMenuStore()

  const items = [] as any
  menuList.forEach(item => {
    // 一级菜单push到数组
    if (keys.includes(item.key)) {
      items.push(item)
    }
    // 二级菜单push到数组
    item?.children?.forEach(m => {
      if (keys.includes(m.key)) {
        items.push(m)
      }
    })
  })

  const logout = () => {
    localStorage.removeItem('token')
    cleanOpenMenu()
    const url = encodeURIComponent(pathname)
    navigate({ pathname: '/login', search: '?redirect=' + url })
  }

  return (
    <div className='flex justify-between items-center px-3 h-10'>
      <motion.div
        key={pathname}
        initial='initial'
        animate='in'
        variants={{
          initial: { opacity: 0, y: -10 },
          in: { opacity: 1, x: 0, y: 0 },
          out: { opacity: 0, y: 10 },
        }}
        transition={{ duration: 0.2 }}
        className={cn('flex text-gray-500 text-xs', className)}
      >
        {items.map((item: any, index: number) => (
          <div key={item.key} className='flex items-center'>
            <div>{item.label}</div>
            {index !== items.length - 1 && <ChevronRight size={14} />}
          </div>
        ))}
      </motion.div>

      <div className='flex justify-between pr-2 space-x-4 items-center'>
        <Dialog>
          <DialogTrigger>
            <div className='text-xs border px-3 items-center h-8 rounded-sm flex space-x-1'><Search size={14} />
            <span>搜索</span></div>
          </DialogTrigger>
          <DialogContent>
            <Input placeholder='请输入搜索关键字' />
          </DialogContent>
        </Dialog>
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className='h-6 w-6 cursor-pointer'>
              {/* <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' /> */}
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            <DropdownMenuItem>个人中心</DropdownMenuItem>
            <DropdownMenuItem>个人设置</DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>
              <LogOutIcon size={16} />
              <span className='pl-4'>退出登录</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Breadcrumb
