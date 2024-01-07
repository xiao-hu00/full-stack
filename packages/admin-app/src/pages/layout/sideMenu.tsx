import { Menu } from '@/components'

const SideMenu = () => {
  const items = [
    {
      key: 'menu1',
      label: 'home',
      link: '/',
    },
    {
      key: 'menu2',
      label: 'user',
      children: [
        {
          key: 'menu2-1',
          label: 'setting',
          link: '/user/setting',
        },
        {
          key: 'menu2-2',
          label: 'role',
          link: '/user/role',
        }
      ]
    },
  ]
  return (
    <Menu items={items} />
  )
}

export default SideMenu