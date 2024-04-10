import { useEffect, useState } from 'react'
import Menu, { SubMenu, Item as MenuItem } from 'rc-menu'
import type { MenuProps } from 'rc-menu'
import { useMenuStore } from '@/store'
import './index.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { CaretRightIcon } from '@radix-ui/react-icons'
import { menuList } from '@/router/router-list'
import { useOpenMenuStore } from '@/store/open-top-tabs'
import { cn } from '@/lib/utils'
import './index.less'

const MyMenu = () => {
  const collapse = useMenuStore(state => state.collapse) // 是否展开侧边栏
  const addOpenItem = useOpenMenuStore(state => state.addOpenMenu) // 把点击的菜单添加到顶部列表
  const [openKeys, setOpenKeys] = useState<string[]>([]) // 当前打开的菜单的key
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]) // 当前选择的菜单的key
  const { pathname } = useLocation()
  const nav = useNavigate()
  useEffect(() => {
    // pathname = '/sub/name' split('/')-> '/', 'sub', 'name'
    const path = pathname.split('/')
    if (collapse) {
      // 折叠的时候，不需要打开子菜单，不用设置setOpenKeys
      const key = path.length > 2 ? [path[2]] : [path[1]]
      setSelectedKeys(key)
      return
    }
    if (path.length > 2) {
      setOpenKeys([path[1], path[2]])
      setSelectedKeys([path[2]])
    } else {
      setSelectedKeys([path[1]])
    }
  }, [collapse, pathname])
  const onOpenChange = (openKeys: string[]) => {
    setOpenKeys(openKeys)
  }
  const onClick: MenuProps['onClick'] = info => {
    setSelectedKeys([info.key])
  }
  const expandNode = (node: any) => ({ height: node.scrollHeight })
  const collapseNode = () => ({ height: 0 })
  const clickLink = (item: any) => {
    nav(item.path)
    addOpenItem({ path: item.path, title: item.label })
  }
  return (
    <>
      <Menu
        onClick={onClick}
        mode={!collapse ? 'inline' : 'vertical'}
        onOpenChange={onOpenChange}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        className={cn({ 'small-menu': collapse })}
        motion={
          !collapse
            ? {
                motionName: 'rc-menu-collapse',
                onAppearStart: collapseNode,
                onAppearActive: expandNode,
                onEnterStart: collapseNode,
                onEnterActive: expandNode,
                onLeaveStart: expandNode,
                onLeaveActive: collapseNode,
              }
            : {
                motionName: 'rc-menu-open-slide-up',
                motionAppear: true,
                motionEnter: true,
                motionLeave: true,
              }
        }
      >
        {menuList?.map(m => {
          if (m.children) {
            // 二级菜单
            return (
              <SubMenu
                popupOffset={[10, 0]}
                key={m.key}
                title={
                  <>
                    <span className={cn({ 'mr-4': !collapse })}>{m.icon}</span>
                    <div
                      className={cn(
                        'flex-1 h-6 overflow-hidden text-ellipsis mr-6',
                        {
                          hidden: collapse,
                        }
                      )}
                    >
                      {m.label}
                    </div>
                  </>
                }
                expandIcon={
                  <CaretRightIcon className={cn({ hidden: collapse })} />
                }
              >
                {m?.children?.map(child => (
                  <MenuItem key={child.key} onClick={() => clickLink(child)}>
                    <span className='text-ellipsis overflow-hidden'>
                      {child.label}
                    </span>
                  </MenuItem>
                ))}
              </SubMenu>
            )
          }
          // 一级菜单
          return (
            <MenuItem key={m.key} onClick={() => clickLink(m)} title={m.label}>
              <span className={cn({ 'mr-4': !collapse })}>{m.icon}</span>
              <span
                className={cn(
                  { hidden: collapse },
                  'text-ellipsis mr-4 overflow-hidden'
                )}
              >
                {m.label}
              </span>
            </MenuItem>
          )
        })}
      </Menu>
    </>
  )
}

export default MyMenu
