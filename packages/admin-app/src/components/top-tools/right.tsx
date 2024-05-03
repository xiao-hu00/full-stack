import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import { menuList, type PropType, type ItemType } from '@/router/router-list'
import { ModeToggle } from '@/components/top-tools/mode-toggle'
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
import ColorTheme from './color-theme'

const TopTools = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { cleanOpenMenu, addOpenMenu } = useOpenMenuStore()
  const [searchList, setSearchList] = useState<
    (PropType & { showName?: string })[]
  >([])
  const [open, setOpen] = useState(false)

  const logout = () => {
    localStorage.removeItem('token')
    cleanOpenMenu()
    const url = encodeURIComponent(pathname)
    navigate({ pathname: '/login', search: '?redirect=' + url })
  }
  const searchChange = (e: any) => {
    const value = e.target.value
    if (!value) {
      setSearchList([])
      return
    }
    const list: PropType[] = []
    menuList.forEach(item => {
      if (item.component && item.label.indexOf(value) > -1) {
        const obj = {
          ...item,
          showName: item.label.replace(
            value,
            `<span class='text-[hsl(var(--primary))]'>${value}</span>`
          ),
        }
        list.push(obj)
        return
      }
      const newChildren: ItemType[] = []
      item?.children?.forEach(m => {
        if (m.label.indexOf(value) > -1) {
          const obj = {
            ...m,
            showName: m.label.replace(
              value,
              `<span class='text-[hsl(var(--primary))]'>${value}</span>`
            ),
          }
          newChildren.push(obj)
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
    <div className='flex justify-between pr-2 space-x-4 items-center'>
      <Dialog
        open={open}
        onOpenChange={() => {
          setSearchList([])
          setOpen(!open)
        }}
      >
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
                  className={cn('p-2 cursor-default', {
                    'hover:bg-[hsl(var(--secondary)/0.65)]': item.path,
                  })}
                  dangerouslySetInnerHTML={{
                    __html: item.showName || item.label,
                  }}
                />
                {item?.children?.map((m: any) => (
                  <div
                    key={m.key}
                    className='p-2 pl-6 cursor-default hover:bg-[hsl(var(--secondary)/0.65)]'
                    onClick={() => searchClick(m)}
                    dangerouslySetInnerHTML={{
                      __html: m.showName || '',
                    }}
                  />
                ))}
              </div>
            ))}
            {searchList.length === 0 && (
              <div className='text-center mt-8'>暂无数据</div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <ColorTheme />
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
  )
}

export default TopTools
