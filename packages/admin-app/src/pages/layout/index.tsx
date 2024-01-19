import Header from './header'
import { DoubleArrowLeftIcon } from '@radix-ui/react-icons'
import { DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { useMenuStore } from '@/store'
import { cn } from "@/lib/utils"
import { Outlet, useNavigate  } from 'react-router-dom'
import { Menu } from '@/components'
import { useEffect } from 'react'

const Layout = () => {
  const collapse = useMenuStore((state) => state.collapse)
  const updateCollapse = useMenuStore((state) => state.updateCollapse)
  const nav = useNavigate()
  const changeMenu = () => {
    updateCollapse(!collapse)
  }
  useEffect(() => {
    const path = localStorage.getItem('pathname')
    if (path) {
      nav(path)
    }
  }, [])
  return (
    <div className="flex">
      <div className={cn('border-r-gray-200 transition-all border-r box-border dark:border-r-gray-600', { 'w-60': !collapse }, { 'w-20': collapse })}>
        <Menu />
        <div onClick={changeMenu} className={cn({ 'w-60': !collapse }, { 'w-20': collapse }, "border-t-gray-200 transition-all border-t fixed bottom-0 flex items-center justify-center cursor-pointer h-10")}>
          {collapse ? <DoubleArrowRightIcon /> : <DoubleArrowLeftIcon />}
        </div>
      </div>
      <div className="flex-1 flex flex-col min-h-[100vh]">
        <div className="p-3 border-b-gray-200 border-b">
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