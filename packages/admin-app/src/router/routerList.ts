import React from "react"

interface ItemType {
  key: string
  label: string
  component: React.LazyExoticComponent<React.ComponentType<object>>
  path?: string
  disable?: boolean
}
interface PropType {
  key: string
  label: string
  component?: React.LazyExoticComponent<React.ComponentType<object>>
  path?: string
  icon?: React.ReactNode
  disable?: boolean
  children?: ItemType[]
}

type MenuPropType = PropType[]

const list = {
  home: React.lazy(() => import('@/pages/home')),
  userSetting: React.lazy(() => import('@/pages/user/setting')),
  userRole: React.lazy(() => import('@/pages/user/role')),
  dataTable: React.lazy(() => import('@/pages/dataTable')),
}

const menuList: MenuPropType = [
  {
    key: 'home',
    label: 'home',
    path: '/home',
    component: list['home']
  },
  {
    key: 'user',
    label: '用户',
    children: [
      {
        key: 'setting',
        label: 'setting',
        path: '/user/setting',
        component: list['userSetting']
      },
      {
        key: 'role',
        label: 'role',
        path: '/user/role',
        component: list['userRole']
      }
    ]
  },
  {
    key: 'dataTable',
    label: '数据表格',
    path: '/dataTable',
    component: list['dataTable']
  },
]
// 扁平化
const routerList: MenuPropType = []
const generateRouter = (arr: MenuPropType) => {
  arr.forEach((m) => {
    if (m.component) {
      routerList.push(m)
    }
    if (m.children) {
      generateRouter(m.children)
    }
  })
}
generateRouter(menuList)

export { routerList, menuList }
