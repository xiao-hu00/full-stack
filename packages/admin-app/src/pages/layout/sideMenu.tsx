import React from 'react'

const SideMenu = () => {
  const clickMenu = (e: React.MouseEvent<HTMLElement>) => {
    const dom = e.currentTarget.nextElementSibling
    const doms = e.currentTarget.nextElementSibling?.children[0]
    const h = dom?.clientHeight ? 0 : (dom?.childElementCount || 0) * ((doms?.clientHeight || 0) + 16 * 0.5)
    console.log(h)
    dom?.setAttribute('style', 'height: ' + h + 'px; transition: height 0.3s;')
  }
  return (
    <div className="p-3 dark:bg-slate-900 h-[100vh] overflow-y-auto">
      <div>
        <div onClick={clickMenu} className="w-[100%] py-2 pl-2 rounded cursor-pointer dark:hover:bg-slate-700 hover:bg-gray-100 mb-2">111</div>
        <div className="menu-child overflow-hidden h-0" style={{ overflow: 'hidden' }}>
          <div className="menu-item w-[100%] py-2 pl-4 rounded cursor-pointer dark:hover:bg-slate-700 hover:bg-gray-100 mb-2">111-111</div>
          <div className="w-[100%] py-2 pl-4 rounded cursor-pointer dark:hover:bg-slate-700 hover:bg-gray-100 mb-2">111-222</div>
        </div>
      </div>
      <div>
        <div onClick={clickMenu} className="w-[100%] py-2 pl-2 rounded cursor-pointer dark:hover:bg-slate-700 hover:bg-gray-100 mb-2">222</div>
        <div className="menu-child overflow-hidden h-0" style={{ overflow: 'hidden' }}>
          <div className="menu-item w-[100%] py-2 pl-4 rounded cursor-pointer dark:hover:bg-slate-700 hover:bg-gray-100 mb-2">222-111</div>
          <div className="w-[100%] py-2 pl-4 rounded cursor-pointer dark:hover:bg-slate-700 hover:bg-gray-100 mb-2">222-222</div>
        </div>
      </div>
      <div>333</div>
    </div>
  )
}

export default SideMenu