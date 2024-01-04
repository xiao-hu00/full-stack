import SideMenu from './sideMenu'
import Header from './header'
import './layout.css'
import { DoubleArrowLeftIcon } from '@radix-ui/react-icons'

const Layout = () => {
  return (
    <div className="flex">
      <div className="w-60 border-r-gray-200 border dark:border-r-gray-600">
        <SideMenu />
        <div className="fixed bottom-0 w-60 flex items-center justify-center cursor-pointer h-10">
          <DoubleArrowLeftIcon />
        </div>
      </div>
      <div className="flex-1 flex flex-col min-h-[100vh]">
        <div className="p-3">
          <Header />
        </div>
        <div className="flex-1 p-3">content</div>
      </div>
    </div>
  )
}

export default Layout