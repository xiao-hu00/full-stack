import React from 'react'
import { Outlet, Link  } from 'react-router-dom'
import { Button } from 'antd'
import './index.css'

const Component: React.FC = () => {
  return (
    <>
      <nav className='nav'>
        <Button type="link">
          <Link to="/">地球</Link>
        </Button>
        <Button type="link">
          <Link to="/map">地图</Link>
        </Button>
      </nav>
      <Outlet />
    </>
  )
}

export default Component
