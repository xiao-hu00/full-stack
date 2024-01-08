import React, { useEffect, useState } from 'react'
import Menu, { SubMenu, Item as MenuItem } from 'rc-menu'
import type { MenuProps } from 'rc-menu'
import { useMenuStore } from '@/store'
import './index.css'
import { Link  } from 'react-router-dom'
import { CaretRightIcon } from '@radix-ui/react-icons'

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
  const collapse = useMenuStore((state) => state.collapse)
  console.log('collapse: ', collapse)
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  useEffect(() => {
    if (collapse) return
    const defaultSub = localStorage.getItem('defaultSub')
    const defaultMenu = localStorage.getItem('defaultMenu')
    if (defaultMenu && defaultSub) {
      setOpenKeys([defaultSub])
      setSelectedKeys([defaultMenu])
    }
    if (defaultSub && !defaultMenu) {
      setSelectedKeys([defaultSub])
    }
    console.log(defaultSub, defaultMenu)
  }, [collapse])
  const onOpenChange = (openKeys: string[]) => {
    console.log('onOpenChange', openKeys);
    setOpenKeys(openKeys)
  }
  const onClick: MenuProps['onClick'] = (info) => {
    console.log('click ', info);
    setSelectedKeys([info.key])
    const keys = info.key.split('-')
    if (keys.length > 1) {
      localStorage.setItem('defaultSub', keys[0])
      localStorage.setItem('defaultMenu', info.key)
    } else {
      localStorage.setItem('defaultSub', keys[0])
      localStorage.removeItem('defaultMenu')
    }
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
        {items?.map((m) => {
          if (m.children) {
            return (
              <SubMenu popupOffset={[10, 15]} key={m.key} title={m.label} expandIcon={<CaretRightIcon />}>
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