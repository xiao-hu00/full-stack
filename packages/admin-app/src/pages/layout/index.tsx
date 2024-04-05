import { useEffect } from 'react'
import Header from './header'
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import { useMenuStore } from '@/store'
import { cn } from '@/lib/utils'
import { Outlet, useNavigate } from 'react-router-dom'
import { Menu } from '@/components'
import LoadingBar from 'react-top-loading-bar'
import { motion } from 'framer-motion'

const Layout = () => {
  const { collapse, progress, updateCollapse } = useMenuStore()
  const pathname = localStorage.getItem('pathname')
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
    <div className='flex'>
      {/* 顶部进度条 */}
      <LoadingBar progress={progress} color={`hsl(var(--primary))`} />
      <div
        className={cn(
          'border-r-gray-200 transition-all border-r box-border dark:border-r-gray-800',
          { 'w-56': !collapse },
          { 'w-16': collapse }
        )}
      >
        <Menu />
        <div
          onClick={changeMenu}
          className={cn(
            'border-t-gray-200 dark:border-t-gray-800 transition-all border-t fixed bottom-0 flex items-center justify-center cursor-pointer h-10',
            { 'w-56': !collapse },
            { 'w-16': collapse }
          )}
        >
          {collapse ? <DoubleArrowRightIcon /> : <DoubleArrowLeftIcon />}
        </div>
      </div>
      <div className='flex-1 flex flex-col h-[100vh] overflow-auto relative'>
        <div className='bg-[hsl(var(--background))] sticky top-0'>
          <Header />
        </div>
        <div className='flex-1 p-3'>
          <motion.div
            key={pathname}
            initial='initial'
            animate='in'
            variants={{
              initial: {
                opacity: 0,
                x: -20
              },
              in: {
                opacity: 1,
                x: 0
              },
              out: {
                opacity: 0,
                x: 20
              },
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Layout
