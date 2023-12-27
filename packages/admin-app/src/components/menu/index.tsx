import React from 'react'
interface ItemType {
  key: string
  label: string
  disable?: boolean
}
interface PropType {
  key: string
  label: string
  icon?: React.ReactNode
  disable?: boolean
  children?: ItemType[]
}

type MenuPropType = PropType[]

const Menu = (props: { items: MenuPropType }) => {
  console.log('items: ', props.items)
  const clickMenu = (e: React.MouseEvent<HTMLElement>) => {
    const doms = document.querySelectorAll('.__menu__child')
    doms.forEach((item) => {
      item?.setAttribute('style', 'height: 0px; opacity: 0;')
    })
    const dom = e.currentTarget.nextElementSibling
    const domC = e.currentTarget.nextElementSibling?.children[0]
    const h = dom?.clientHeight ? 0 : (dom?.childElementCount || 0) * ((domC?.clientHeight || 0) + 16 * 0.5)
    console.log(h)
    const opacity = h ? 1 : 0
    dom?.setAttribute('style', `height: ${h}px; opacity: ${opacity};`)
  }
  return (
    <div className="p-3 dark:bg-slate-900 h-[100vh] overflow-y-auto">
      <div>
        <div onClick={clickMenu} className="w-[100%] py-2 pl-2 rounded cursor-pointer dark:hover:bg-slate-700 hover:bg-gray-100 mb-2">111</div>
        <div className="__menu__child overflow-hidden h-0" style={{ overflow: 'hidden' }}>
          <div className="w-[100%] py-2 pl-4 rounded cursor-pointer dark:hover:bg-slate-700 hover:bg-gray-100 mb-2">111-111</div>
          <div className="w-[100%] py-2 pl-4 rounded cursor-pointer dark:hover:bg-slate-700 hover:bg-gray-100 mb-2">111-222</div>
        </div>
      </div>
      <div>
        <div onClick={clickMenu} className="w-[100%] py-2 pl-2 rounded cursor-pointer dark:hover:bg-slate-700 hover:bg-gray-100 mb-2">222</div>
        <div className="__menu__child overflow-hidden h-0" style={{ overflow: 'hidden' }}>
          <div className="w-[100%] py-2 pl-4 rounded cursor-pointer dark:hover:bg-slate-700 hover:bg-gray-100 mb-2">222-111</div>
          <div className="w-[100%] py-2 pl-4 rounded cursor-pointer dark:hover:bg-slate-700 hover:bg-gray-100 mb-2">222-222</div>
          <div className="w-[100%] py-2 pl-4 rounded cursor-pointer dark:hover:bg-slate-700 hover:bg-gray-100 mb-2">222-333</div>
        </div>
      </div>
      <div>333</div>
    </div>
  )
}

export default Menu