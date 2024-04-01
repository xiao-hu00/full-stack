import { useState } from 'react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { X } from 'lucide-react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { useOpenMenuStore } from '@/store/open-list'

const OpenTabs = () => {
  const [activeMenu, setActiveMenu] = useState({
    title: '',
    url: ''
  })
  const clickMenu = (item: any) => {
    setActiveMenu(item)
  }
  const openMenuList = useOpenMenuStore(state => state.openMenuList)
  return (
    <ScrollArea className='flex-1 px-4'>
      <div className='flex space-x-4 h-14'>
        {openMenuList?.map((item, index) => (
          <div key={item.url} className='flex space-x-2 items-center'>
            <div className='flex items-center space-x-4'>
              <div className='cursor-pointer whitespace-nowrap hover:text-[hsl(var(--primary)/0.75)]'>
                <ContextMenu>
                  <ContextMenuTrigger
                    className={`${
                      activeMenu?.title === item.title ? 'text-[hsl(var(--primary))]' : ''
                    }`}
                    onClick={() => clickMenu(item)}
                  >
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
              <X size={14} className='cursor-pointer hover:text-red-400' />
            </div>
            <Separator
              orientation='vertical'
              hidden={index === openMenuList.length - 1}
              className='h-6'
            />
          </div>
        ))}
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )
}

export default OpenTabs
