import React from 'react'
import { Outlet, Link  } from 'react-router-dom'
import './index.css'

const Component: React.FC = () => {
  return (
    <>
      <nav className='nav'>
        <Link to="/">地球</Link>
        <Link to="/map">地图</Link>
        <Link to="/glb">模型</Link>
        <Link to="/animate">动画</Link>
      </nav>
      <Outlet />
    </>
  )
}

export default Component
