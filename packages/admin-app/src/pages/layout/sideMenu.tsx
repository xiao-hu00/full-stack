import { animated, useSpring } from '@react-spring/web'
import React from 'react'

const SideMenu = () => {
  const [hStyle, api] = useSpring(
    () => ({
      height: 0
    }),
    []
  )
  const clickMenu = (e: React.MouseEvent<HTMLElement>) => {
    const doms = e.currentTarget.nextElementSibling?.children[0]
    const dom = e.currentTarget.nextElementSibling
    const h = dom?.clientHeight ? 0 : (dom?.childElementCount || 0) * ((doms?.clientHeight || 0) + 16 * 0.5)
    console.log(h)
    api.start({ height: h })
  }
  return (
    <div className="p-3 dark:bg-slate-900 h-[100vh] overflow-y-auto">
      <div>
        <div onClick={clickMenu} className="w-[100%] py-2 pl-2 rounded cursor-pointer dark:hover:bg-slate-700 hover:bg-gray-100 mb-2">111</div>
        <animated.div className="menu-child" style={{ ...hStyle, overflow: 'hidden' }}>
          <div className="menu-item w-[100%] py-2 pl-4 rounded cursor-pointer dark:hover:bg-slate-700 hover:bg-gray-100 mb-2">111-111</div>
          <div className="w-[100%] py-2 pl-4 rounded cursor-pointer dark:hover:bg-slate-700 hover:bg-gray-100 mb-2">111-222</div>
        </animated.div>
      </div>
      <div>
        <div>222</div>
        <div>222-111</div>
        <div>222-222</div>
      </div>
      <div>333</div>
    </div>
  )
}

export default SideMenu