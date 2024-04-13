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
import { useOpenMenuStore, type menuItem } from '@/store/open-top-tabs'
import { useNavigate, useLocation } from 'react-router-dom'
import { routerList } from '@/router/router-list'

const OpenTabs = () => {
  const openMenuList = useOpenMenuStore(state => state.openMenuList)
  const { addOpenMenu, deleteOpenMenu, updateOpenMenu } = useOpenMenuStore()
  const [delIndex, setDelIndex] = useState(-1)
  const [activeMenu, setActiveMenu] = useState({
    title: '',
    path: '',
    index: -1,
  })
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const scrollRef = useRef<any>(null)

  useEffect(() => {
    const obj = routerList.find(m => m.path === pathname)
    addOpenMenu({ title: obj?.label || '', path: pathname })
  }, [])
  const findMenuIndex = (item: any) =>
    openMenuList.findIndex(m => m.title === item?.title)
  useEffect(() => {
    // 刷新或者删除之后，当前应该高亮显示的tab
    const current = openMenuList.find(item => item.path === pathname)
    const index = findMenuIndex(current) || -1
    if (current) {
      setActiveMenu({ ...current, index })
      return
    }
    if (openMenuList.length) {
      const index = delIndex > -1 ? delIndex : openMenuList.length - 1
      // 点击删除后，下一个应该显示的菜单
      const next = openMenuList[index] ?? openMenuList[openMenuList.length - 1]
      setActiveMenu({ ...next, index })
      navigate(next.path)
    }
  }, [pathname, openMenuList])
  const clickMenu = (item: any) => {
    setActiveMenu(item)
    navigate(item.path || '/home')
  }
  const deleteMenu = (item: menuItem, e: any) => {
    if (item.title === activeMenu.title) {
      const index = findMenuIndex(item)
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
  const update = (item: menuItem, type: string) => {
    const index = findMenuIndex(item)
    let list = [] as menuItem[]
    if (type === 'right') {
      // 关闭右侧
      list = openMenuList.filter((_, i) => i <= index)
    } else if (type === 'left') {
      // 关闭左侧
      list = openMenuList.filter((_, i) => i >= index)
      setDelIndex(index - 1)
    } else if (type === 'other') {
      // 关闭其他
      list = openMenuList.filter((_, i) => i === index)
    }
    
    updateOpenMenu(list)
  }
  return (
    <div
      className='flex-1 pr-6 w-[100% - 120px] overflow-auto no-scrollbar text-sm'
      ref={scrollRef}
      onWheel={e => onWheel(e)}
    >
      <div className='flex h-10'>
        {openMenuList?.map((item, index) => (
          <div
            key={item.path}
            className={cn(
              'flex items-center cursor-pointer hover:text-[hsl(var(--primary))] select-none',
              {
                'text-[hsl(var(--primary))] f-open-item bg-white dark:bg-black':
                  activeMenu?.title === item.title,
              }
            )}
          >
            <ContextMenu>
              <ContextMenuTrigger
                onClick={() => clickMenu(item)}
                className='flex items-center space-x-4 justify-between px-3 w-full h-full whitespace-nowrap'
              >
                <div>{item.title}</div>
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
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem onClick={() => update(item, 'right')}>
                  关闭右侧
                </ContextMenuItem>
                <ContextMenuItem onClick={() => update(item, 'left')}>关闭左侧</ContextMenuItem>
                <ContextMenuItem onClick={() => update(item, 'other')}>关闭其他</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>

            <Separator
              orientation='vertical'
              hidden={index === openMenuList.length - 1}
              className={cn('h-6 dark:bg-gray-700', {
                invisible:
                  activeMenu?.title === item.title ||
                  index === activeMenu.index - 1,
              })}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default OpenTabs
