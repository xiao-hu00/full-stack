import { Menu } from '@/components'

const SideMenu = () => {
  const items = [
    {
      key: 'menu1',
      label: 'label1'
    },
    {
      key: 'menu2',
      label: 'label2',
      children: [
        {
          key: 'menu2-1',
          label: 'label2-1',
        }
      ]
    }
  ]
  return (
    <Menu items={items} />
  )
}

export default SideMenu