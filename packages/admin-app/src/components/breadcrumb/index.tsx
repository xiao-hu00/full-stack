/*
 * @Author: xiaohu
 * @Date: 2024-01-27 15:46:07
 * @LastEditTime: 2024-04-05 16:54:41
 * @LastEditors: xiaohu
 * @Description: 面包屑组件
 */

import { ChevronRight } from 'lucide-react'
type ItemType = {
  key: string | number,
  label: string
}
interface PropsType {
  items: ItemType[]
}

const Breadcrumb = ({ items }: PropsType) => {
  return (
    <div className='flex text-gray-500 text-xs h-6 items-center mb-2'>
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