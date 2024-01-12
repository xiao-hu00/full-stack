import { useEffect, useState } from 'react'
import Menu, { SubMenu, Item as MenuItem } from 'rc-menu'
import type { MenuProps } from 'rc-menu'
import { useMenuStore } from '@/store'
import './index.css'
import { Link, useLocation  } from 'react-router-dom'
import { CaretRightIcon } from '@radix-ui/react-icons'
import { menuList } from '@/router/routerList'

const MyMenu = () => {
  const collapse = useMenuStore((state) => state.collapse)
  console.log('collapse: ', collapse)
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
    console.log('onOpenChange', openKeys);
    setOpenKeys(openKeys)
  }
  const onClick: MenuProps['onClick'] = (info) => {
    console.log(info)
    setSelectedKeys([info.key])
    const path = info.keyPath
    const url = path.length === 1  ? '/' + path[0] : '/' + path[1] + '/' + path[0]
    localStorage.setItem('pathname', url)
  }
  return (
    <>
      <Menu
        onClick={onClick}
        mode={!collapse ? 'inline' : 'vertical'}
        onOpenChange={onOpenChange}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
      >
        {menuList?.map((m) => {
          if (m.children) {
            return (
              <SubMenu popupOffset={[10, 15]} key={m.key} title={m.label} expandIcon={<CaretRightIcon />}>
                {m?.children?.map((child) => (
                  <MenuItem key={child.key}>
                    <Link to={child.path || '/'}>{child.label}</Link>
                  </MenuItem>
                ))}
              </SubMenu>
            )
          }
          return <MenuItem key={m.key}>
            <Link to={m.path || '/'}>{m.label}</Link>
          </MenuItem>
        })}
      </Menu>
    </>
  )
}

export default MyMenu