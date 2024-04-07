import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

type ItemType = {
  key: string | number,
  label: string
}
interface PropsType {
  items: ItemType[]
  className?: string
}

const Breadcrumb = ({ items, className }: PropsType) => {
  return (
    <div className={cn('flex text-gray-500 text-xs items-center pl-3 h-8', className)}>
      {items.map((item, index) => (
        <div key={item.key} className='flex items-center'>
          <div>{item.label}</div>
          {(index !== items.length - 1) && <ChevronRight size={14} />}
        </div>
      ))}
    </div>
  )
}

export default Breadcrumb