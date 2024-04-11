import Header from './header'
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import { useMenuStore } from '@/store'
import { cn } from '@/lib/utils'
import { Outlet, useLocation } from 'react-router-dom'
import { Menu } from '@/components'
import { motion } from 'framer-motion'

const Layout = () => {
  const { collapse, updateCollapse } = useMenuStore()
  const { pathname } = useLocation()
  const changeMenu = () => {
    updateCollapse(!collapse)
  }

  return (
    <div
      className='grid h-[100vh] transition-all overflow-auto'
      style={{
        gridTemplateColumns: collapse ? '4rem 1fr' : '14rem 1fr',
        gridTemplateRows: '5rem 1fr',
      }}
    >
      <aside
        className='border-r-gray-200 border-r box-border dark:border-r-gray-800 row-span-2 grid h-[100vh] sticky top-0 overflow-auto no-scrollbar'
        style={{
          gridTemplateRows: '1fr 2.5rem',
        }}
      >
        <Menu />
        <div
          onClick={changeMenu}
          className={cn(
            'border-gray-200 dark:border-gray-800 border-t flex items-center justify-center cursor-pointer h-10 z-2 bg-[hsl(var(--background))] w-[100%]'
          )}
        >
          {collapse ? <DoubleArrowRightIcon /> : <DoubleArrowLeftIcon />}
        </div>
      </aside>
      <header className='bg-[hsl(var(--background))] sticky top-0 z-2 auto-cols-fr'>
        <Header />
      </header>

      <main className='flex-1 p-4 bg-gray-50 dark:bg-gray-900 auto-cols-fr'>
        <motion.div
          className='bg-[hsl(var(--background))] h-[100%]'
          key={pathname}
          initial='initial'
          animate='in'
          variants={{
            initial: {
              opacity: 0,
              x: -20,
            },
            in: {
              opacity: 1,
              x: 0,
            },
            out: {
              opacity: 0,
              x: 20,
            },
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  )
}

export default Layout
