import { Menu } from '@/components'

const SideMenu = () => {
  const items = [
    {
      key: 'home',
      label: 'home',
      link: '/home',
    },
    {
      key: 'user',
      label: '用户',
      children: [
        {
          key: 'user-setting',
          label: 'setting',
          link: '/user/setting',
        },
        {
          key: 'user-role',
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