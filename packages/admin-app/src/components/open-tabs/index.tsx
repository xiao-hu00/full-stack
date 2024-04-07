import { useEffect, useRef, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { useOpenMenuStore } from '@/store/open-top-tabs'
import { useNavigate, useLocation } from 'react-router-dom'
import { routerList } from '@/router/router-list'

const OpenTabs = () => {
  const openMenuList = useOpenMenuStore(state => state.openMenuList)
  const deleteOpenMenu = useOpenMenuStore(state => state.deleteOpenMenu)
  const { addOpenMenu } = useOpenMenuStore()
  const [delIndex, setDelIndex] = useState(-1)
  const [activeMenu, setActiveMenu] = useState({
    title: '',
    path: '',
  })
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const scrollRef = useRef<any>(null)

  useEffect(() => {
    const obj = routerList.find(m => m.path === pathname)
    addOpenMenu({ title: obj?.label || '', path: pathname })
  }, [])
  useEffect(() => {
    const current = openMenuList?.find(item => item.path === pathname)
    if (current) {
      setActiveMenu(current)
      return
    }
    if (openMenuList?.length) {
      const index = delIndex > -1 ? delIndex : openMenuList.length - 1
      const next = openMenuList[index] ?? openMenuList[openMenuList.length - 1]
      setActiveMenu(next)
      navigate(next.path)
    }
  }, [pathname, openMenuList])
  const clickMenu = (item: any) => {
    setActiveMenu(item)
    navigate(item.path || '/home')
  }
  const deleteMenu = (item: any, e: any) => {
    if (item.title === activeMenu.title) {
      const index = openMenuList?.findIndex(m => m.title === item.title)
      if (index === 0 || (index && index > -1)) {
        setDelIndex(index)
      }
    }
    deleteOpenMenu(item)
    e.stopPropagation()
  }
  const onWheel = (e: any) => {
    scrollRef.current.scrollLeft += e.deltaY
  }
  return (
    <div
      className='flex-1 pr-6 w-[100% - 120px] overflow-auto no-scrollbar'
      ref={scrollRef}
      onWheel={e => onWheel(e)}
    >
      <div className='flex h-12'>
        {openMenuList?.map((item, index) => (
          <div
            key={item.path}
            className={cn(
              'flex items-center cursor-pointer hover:text-[hsl(var(--primary))] select-none',
              {
                'text-[hsl(var(--primary))] bg-white dark:bg-black':
                  activeMenu?.title === item.title,
              }
            )}
            onClick={() => clickMenu(item)}
          >
            <div className='flex w-32 items-center space-x-4 justify-between px-3'>
              <div className='whitespace-nowrap'>
                <ContextMenu>
                  <ContextMenuTrigger className='h-[100%] w-[100%]'>
                    {item.title}
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem>关闭右侧</ContextMenuItem>
                    <ContextMenuItem>关闭左侧</ContextMenuItem>
                    <ContextMenuItem>关闭其他</ContextMenuItem>
                    <ContextMenuItem>关闭所有</ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </div>
              <X
                size={14}
                onClick={e => deleteMenu(item, e)}
                className={cn(
                  'cursor-pointer text-gray-400 hover:text-red-400',
                  {
                    invisible: openMenuList.length === 1,
                  }
                )}
              />
            </div>
            <Separator
              orientation='vertical'
              hidden={index === openMenuList.length - 1}
              className={cn('h-6 dark:bg-gray-700', {
                invisible: activeMenu?.title === item.title,
              })}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default OpenTabs
