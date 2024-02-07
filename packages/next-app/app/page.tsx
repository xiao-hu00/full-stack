'use client'
import { useSpring, animated } from '@react-spring/web'
import Image from 'next/image'

export default function Home() {
  const [props, api] = useSpring(() => ({ x: 0, y: 0 }))

  const click = () => {
    api.start({ x: 100, y: 120 })
  }

  return (
    <>
      <div className='h-15'>图片</div>
      <div className='grid grid-cols-3'>
        <div className='h-8 w-30'>item1</div>
        <div className='h-8 w-30'>
          <animated.div style={props} onClick={click} className='cursor-pointer'>item2</animated.div>
        </div>
        <div className='h-8 w-30'>item3</div>
        <div className='h-8 w-30'>item4</div>
      </div>
      <div>我们的团队简介</div>
      <div>团队照片</div>
      <div>成员简介</div>
      <div>上图片下文字，点击后放大</div>
      <div>联系我们</div>
      <div>底部信息</div>
    </>
  )
}
