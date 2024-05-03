import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import { menuList, type PropType } from '@/router/router-list'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Right from './right'

const TopTools = () => {
  const { pathname } = useLocation()
  const keys = pathname.split('/').filter(m => !!m)

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
        className={cn('flex text-gray-500 text-xs')}
      >
        {items.map((item: any, index: number) => (
          <div key={item.key} className='flex items-center'>
            <div>{item.label}</div>
            {index !== items.length - 1 && <ChevronRight size={14} />}
          </div>
        ))}
      </motion.div>
      <Right />
    </div>
  )
}

export default TopTools
