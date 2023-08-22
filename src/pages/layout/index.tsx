import React, { useState } from 'react'
import { Outlet, Link  } from 'react-router-dom'
import './index.css'
import classnames from 'classnames'

const navList = [
  { title: '地球', path: '/', active: true },
  { title: '地图', path: '/map', active: false },
  { title: '模型', path: '/glb', active: false },
  { title: '动画', path: '/animate', active: false },
  { title: '收藏', path: '/collect', active: false },
  { title: '关于', path: '/about', active: false },
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
    <div className="flex h-[100vh] w-[100%] flex-col">
      <div className='flex z-2 bg-black'>
        <nav className='nav h-12 flex items-center justify-center w-[100%]'>
          {list.map((item, i: number) => (
            <Link to={item.path} key={i} onClick={() => navClick(i)} className={`nav-link ${classnames({'text-red-400': item.active})}`}>
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex-1 overflow-scroll" style={{ height: 'calc(100vh - 42px)' }}>
        <Outlet />
      </div>
    </div>
  )
}

export default Component
