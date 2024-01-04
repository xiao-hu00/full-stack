import React, { useEffect, useState } from 'react'
import Menu, { SubMenu, Item as MenuItem } from 'rc-menu'
import type { MenuProps } from 'rc-menu'

import './index.css'
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

const MyMenu = (props: { items: MenuPropType }) => {
  console.log('items: ', props.items.length)
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
        mode="inline"
        onOpenChange={onOpenChange}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
      >
        <SubMenu key="1" title="submenu1">
          <MenuItem key="1-1">item1-1</MenuItem>
          <MenuItem key="1-2">item1-2</MenuItem>
        </SubMenu>
        <SubMenu key="2" title="submenu2">
          <MenuItem key="2-1">item2-1</MenuItem>
          <MenuItem key="2-2">item2-2</MenuItem>
        </SubMenu>
        <MenuItem key="3">item3</MenuItem>
      </Menu>
    </>
  )
}

export default MyMenu