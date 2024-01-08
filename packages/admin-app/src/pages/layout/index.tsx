import Header from './header'
import './layout.css'
import { DoubleArrowLeftIcon } from '@radix-ui/react-icons'
import { DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { useMenuStore } from '@/store'
import ClassNames from 'classnames'
import { Outlet  } from 'react-router-dom'
import { Menu } from '@/components'

const Layout = () => {
  const collapse = useMenuStore((state) => state.collapse)
  const updateCollapse = useMenuStore((state) => state.updateCollapse)
  const changeMenu = () => {
    updateCollapse(!collapse)
  }
  return (
    <div className="flex">
      <div className={ClassNames('border-r-gray-200 border box-border dark:border-r-gray-600', { 'w-60': !collapse }, { 'w-20': collapse })}>
        <Menu />
        <div onClick={changeMenu} className={ClassNames({ 'w-60': !collapse }, { 'w-20': collapse }, "fixed bottom-0 flex items-center justify-center cursor-pointer h-10")}>
          {collapse ? <DoubleArrowRightIcon /> : <DoubleArrowLeftIcon />}
        </div>
      </div>
      <div className="flex-1 flex flex-col min-h-[100vh]">
        <div className="p-3">
          <Header />
        </div>
        <div className="flex-1 p-3">
          <Outlet />          
        </div>
      </div>
    </div>
  )
}

export default Layout