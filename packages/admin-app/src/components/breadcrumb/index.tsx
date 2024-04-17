import { cn } from '@/lib/utils'
import { ChevronRight, Search } from 'lucide-react'
import { menuList, type PropType, type ItemType } from '@/router/router-list'
import { motion } from 'framer-motion'
import { ModeToggle } from '@/components/mode-toggle'
import { LogOutIcon } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useOpenMenuStore } from '@/store/open-top-tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '../ui/input'
import { useState } from 'react'
interface PropsType {
  className?: string
}

const Breadcrumb = ({ className }: PropsType) => {
  const { pathname } = useLocation()
  const keys = pathname.split('/').filter(m => !!m)
  const navigate = useNavigate()
  const { cleanOpenMenu, addOpenMenu } = useOpenMenuStore()
  const [searchList, setSearchList] = useState<PropType[]>([])
  const [open, setOpen] = useState(false)

  const items: PropType[] = []
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
  const searchChange = (e: any) => {
    if (!e.target.value) {
      setSearchList([])
      return
    }
    const list: PropType[] = []
    menuList.forEach(item => {
      if (item.component && item.label.indexOf(e.target.value) > -1) {
        list.push(item)
        return
      }
      const newChildren: ItemType[] = []
      item?.children?.forEach(m => {
        if (m.label.indexOf(e.target.value) > -1) {
          newChildren.push(m)
        }
      })
      if (newChildren.length > 0) {
        list.push({ ...item, children: newChildren })
      }
    })
    setSearchList(list)
  }

  const searchClick = (item: PropType) => {
    if (item.component && item.path) {
      setOpen(false)
      navigate({ pathname: item.path })
      addOpenMenu({ path: item.path, title: item.label })
    }
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
        <Dialog open={open} onOpenChange={() => {
          setSearchList([])
          setOpen(!open)
        }}>
          <DialogTrigger>
            <div className='text-xs border px-3 items-center h-8 rounded-sm flex space-x-1'>
              <Search size={14} />
              <span>搜索</span>
            </div>
          </DialogTrigger>
          <DialogContent className='p-0'>
            <div className='flex h-12 items-center pl-2 pr-8 border-b border-b-gray-100 dark:border-b-gray-800'>
              <Search className='text-gray-500' size={18} />
              <Input
                className='h-full border-none focus-visible:ring-0 shadow-none'
                placeholder='请输入搜索关键字'
                onChange={e => searchChange(e)}
              />
            </div>
            <div className='h-[300px] overflow-auto p-0'>
              {searchList.map(item => (
                <div key={item.key} className='px-2'>
                  <div
                    onClick={() => searchClick(item)}
                    className='p-2 cursor-default hover:bg-[hsl(var(--secondary)/0.65)]'
                  >
                    {item.label}
                  </div>
                  {item?.children?.map((m: any) => (
                    <div
                      key={m.key}
                      className='p-2 pl-6 cursor-default hover:bg-[hsl(var(--secondary)/0.65)]'
                      onClick={() => searchClick(m)}
                    >
                      {m.label}
                    </div>
                  ))}
                </div>
              ))}
              {searchList.length === 0 && (
                <div className='text-center mt-8'>暂无数据</div>
              )}
            </div>
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
