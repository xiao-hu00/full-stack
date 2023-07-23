import React, { useState } from 'react'
import { Outlet, Link  } from 'react-router-dom'
import './index.css'
import classnames from 'classnames'

const navList = [
  { itle: '地球', path: '/', active: true },
  { itle: '地图', path: '/map', active: false },
  { itle: '模型', path: '/glb', active: false },
  { itle: '动画', path: '/animate', active: false },
  { itle: '收藏', path: '/collect', active: false },
  { itle: '关于', path: '/about', active: false },
]

const Component: React.FC = () => {
  
  const [list, setList] = useState(navList)
  const navClick = (i: number) => {
    const list = navList.map((item, index) => {
      item.active = i === index
      return item
    })
    setList(list)
  }
  return (
<<<<<<< HEAD
    <div className='root-main'>
      <div className='nav-main'>
        <nav className='nav'>
          <Link to='/'>地球</Link>
          <Link to='/map'>地图</Link>
          <Link to='/glb'>模型</Link>
          <Link to='/animate'>动画</Link>
          <Link to='/collect'>收藏</Link>
          <Link to='/about'>关于</Link>
        </nav>
      </div>
      <div className='root-content'>
=======
    <div className="flex h-[100vh] w-[100%] flex-col">
      <div className='flex z-2 bg-black'>
        <nav className='nav h-12 flex items-center justify-center w-[100%]'>
          {list.map((item, i: number) => (
            <Link to={item.path} key={i} onClick={() => navClick(i)} className={`nav-link ${classnames({'text-red-400': item.active})}`}>
              {item.itle}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex-1">
>>>>>>> c191745576ff40bf3b9bf36174ddeb1c69a32e4b
        <Outlet />
      </div>
    </div>
  )
}

export default Component
