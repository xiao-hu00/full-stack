import React, { useEffect, useState } from 'react'
import Menu, { SubMenu, Item as MenuItem } from 'rc-menu'
import type { MenuProps } from 'rc-menu'
import { useMenuStore } from '@/store'
import './index.css'
import { Link  } from 'react-router-dom'

interface ItemType {
  key: string
  label: string
  link?: string
  disable?: boolean
}
interface PropType {
  key: string
  label: string
  link?: string
  icon?: React.ReactNode
  disable?: boolean
  children?: ItemType[]
}

type MenuPropType = PropType[]

const MyMenu = (props: { items: MenuPropType }) => {
  const { items } = props
  const collpase = useMenuStore((state) => state.collapse)
  console.log('collpase: ', collpase)
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  useEffect(() => {
    setOpenKeys(["1", '1-1'])
    setSelectedKeys(['1-1'])
  }, [])
  const onOpenChange = (openKeys: string[]) => {
    console.log('onOpenChange', openKeys);
    setOpenKeys(openKeys)
  }
  const onClick: MenuProps['onClick'] = (info) => {
    console.log('click ', info);
    setSelectedKeys([info.key])
  }
  return (
    <>
      <Menu
        onClick={onClick}
        mode={!collpase ? 'inline' : 'vertical'}
        onOpenChange={onOpenChange}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
      >
        {items?.map((m) => {
          if (m.children) {
            return (
              <SubMenu key={m.key} title={m.label}>
                {m?.children?.map((child) => (
                  <MenuItem key={child.key}>
                    <Link to={child.link || '/'}>{child.label}</Link>
                  </MenuItem>
                ))}
              </SubMenu>
            )
          }
          return <MenuItem key={m.key}>
            <Link to={m.link || '/'}>{m.label}</Link>
          </MenuItem>
        })}
      </Menu>
    </>
  )
}

export default MyMenu