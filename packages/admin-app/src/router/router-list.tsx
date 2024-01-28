import React from "react"
import { Home, UserCog2, FileText } from 'lucide-react'

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
  icon?: JSX.Element
  disable?: boolean
  children?: ItemType[]
}

type MenuPropType = PropType[]

const list = {
  home: React.lazy(() => import('@/pages/home')),
  userSetting: React.lazy(() => import('@/pages/user/setting')),
  userRole: React.lazy(() => import('@/pages/user/role')),
  dataList: React.lazy(() => import('@/pages/data-list')),
}

const iconSize = 16

const menuList: MenuPropType = [
  {
    key: 'home',
    label: '首页',
    path: '/home',
    component: list['home'],
    icon: <Home size={iconSize} />
  },
  {
    key: 'user',
    label: '用户设置',
    icon: <UserCog2 size={iconSize} />,
    children: [
      {
        key: 'setting',
        label: '账户设置',
        path: '/user/setting',
        component: list['userSetting']
      },
      {
        key: 'role',
        label: '角色设置',
        path: '/user/role',
        component: list['userRole']
      }
    ]
  },
  {
    key: 'dataList',
    label: '数据列表',
    path: '/dataList',
    icon: <FileText size={iconSize} />,
    component: list['dataList']
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
