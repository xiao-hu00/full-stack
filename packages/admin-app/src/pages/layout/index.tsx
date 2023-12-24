import SideMenu from './sideMenu'
import Header from './header'

const Layout = () => {
  return (
    <div className="flex">
      <div className="w-60 p-3">
        <SideMenu />
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