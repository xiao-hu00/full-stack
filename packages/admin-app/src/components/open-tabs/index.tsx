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

const OpenTabs = () => {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const [activeMenu, setActiveMenu] = useState(1)
  const clickMenu = (item: number) => {
    setActiveMenu(item)
  }
  return (
    <ScrollArea className='flex-1 px-4'>
      <div className='flex space-x-4 h-14'>
        {list.map((item, index) => (
          <div key={item} className='flex space-x-2 items-center'>
            <div className='flex items-center space-x-4'>
              <div className='cursor-pointer whitespace-nowrap hover:text-[hsl(var(--primary)/0.75)]'>
                <ContextMenu>
                  <ContextMenuTrigger
                    className={`${
                      activeMenu === item ? 'text-[hsl(var(--primary))]' : ''
                    }`}
                    onClick={() => clickMenu(item)}
                  >
                    menu-{item}
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
              hidden={index === list.length - 1}
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
