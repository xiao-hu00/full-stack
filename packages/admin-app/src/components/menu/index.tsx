import { useEffect, useState } from 'react'
import Menu, { SubMenu, Item as MenuItem } from 'rc-menu'
import type { MenuProps } from 'rc-menu'
import { useMenuStore } from '@/store'
import './index.css'
import { Link, useLocation } from 'react-router-dom'
import { CaretRightIcon } from '@radix-ui/react-icons'
import { menuList } from '@/router/router-list'
import { useOpenMenuStore } from '@/store/open-list'
import { cn } from '@/lib/utils'

const MyMenu = () => {
  const collapse = useMenuStore(state => state.collapse)
  const addOpenItem = useOpenMenuStore(state=> state.addOpenMenu)
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const { pathname } = useLocation()
  useEffect(() => {
    // pathname = '/sub/name' split('/')-> '/', 'sub', 'name'
    if (collapse) return // 折叠的时候不需要执行
    const path = pathname.split('/')
    if (path.length > 2) {
      setOpenKeys([path[1], path[2]])
      setSelectedKeys([path[2]])
    } else {
      setSelectedKeys([path[1]])
    }
  }, [collapse])
  const onOpenChange = (openKeys: string[]) => {
    setOpenKeys(openKeys)
  }
  const onClick: MenuProps['onClick'] = info => {
    setSelectedKeys([info.key])
    const path = info.keyPath
    const url =
      path.length === 1 ? '/' + path[0] : '/' + path[1] + '/' + path[0]
    localStorage.setItem('pathname', url)
  }
  const expandNode = (node: any) => ({ height: node.scrollHeight })
  const collapseNode = () => ({ height: 0 })
  const clickLink = (item: any) => {
    console.log(item)
    addOpenItem({ url: item.path, title: item.label })
  }
  return (
    <>
      <Menu
        onClick={onClick}
        mode={!collapse ? 'inline' : 'vertical'}
        onOpenChange={onOpenChange}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
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
            : {}
        }
      >
        {menuList?.map(m => {
          if (m.children) {
            return (
              <SubMenu
                popupOffset={[10, 15]}
                key={m.key}
                title={
                  <>
                    <span className={cn('transition-all',{'pl-4': collapse, 'mr-4': !collapse })}>
                      {m.icon}
                    </span>
                    <div className={cn('flex-1 h-6 overflow-hidden', { hidden: collapse })}>
                      {m.label}
                    </div>
                  </>
                }
                expandIcon={<CaretRightIcon />}
              >
                {m?.children?.map(child => (
                  <MenuItem key={child.key}>
                    <Link onClick={() => clickLink(child)} to={child.path || '/'}>{child.label}</Link>
                  </MenuItem>
                ))}
              </SubMenu>
            )
          }
          return (
            <MenuItem key={m.key}>
              <Link to={m.path || '/'} onClick={() => clickLink(m)}>
                <span className={cn('mr-4 transition-all', {'pl-4': collapse})}>
                  {m.icon}
                </span>
                <span className={cn({ hidden: collapse })}>{m.label}</span>
              </Link>
            </MenuItem>
          )
        })}
      </Menu>
    </>
  )
}

export default MyMenu
