import React from 'react'
import { Home, UserCog2, Component } from 'lucide-react'

export interface ItemType {
  key: string
  label: string
  component: React.LazyExoticComponent<React.ComponentType<object>>
  path?: string
  disable?: boolean
}
export interface PropType {
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
  icons: React.lazy(() => import('@/pages/widget/icons')),
  form: React.lazy(() => import('@/pages/widget/form')),
  table: React.lazy(() => import('@/pages/widget/table')),
}

const iconSize = 16

const menuList: MenuPropType = [
  {
    key: 'home',
    label: '首页',
    path: '/home',
    component: list['home'],
    icon: <Home size={iconSize} />,
  },
  {
    key: 'user',
    label: '配置',
    icon: <UserCog2 size={iconSize} />,
    children: [
      {
        key: 'setting',
        label: '账户设置',
        path: '/user/setting',
        component: list['userSetting'],
      },
      {
        key: 'role',
        label: '角色设置',
        path: '/user/role',
        component: list['userRole'],
      },
    ],
  },
  {
    key: 'widget',
    label: '组件',
    icon: <Component size={iconSize} />,
    children: [
      {
        key: 'icons',
        label: '图标',
        path: '/widget/icons',
        component: list['icons'],
      },
      {
        key: 'table',
        label: '数据表格',
        path: '/widget/table',
        component: list['table'],
      },
      {
        key: 'form',
        label: '表单',
        path: '/widget/form',
        component: list['form'],
      },
    ],
  },
]
// 扁平化
const routerList: MenuPropType = []
const generateRouter = (arr: MenuPropType) => {
  arr.forEach(m => {
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
