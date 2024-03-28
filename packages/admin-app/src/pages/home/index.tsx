import { Breadcrumb } from '@/components'
import { Button } from '@/components/ui/button'
import { themes } from './themes'

const Home = () => {
  const changeTheme = (type: string) => {
    const config = themes.find(item => item.name === type)
    console.log(config)
    document.body.classList.forEach(className => {
      if (className.match(/^theme.*/)) {
        document.body.classList.remove(className)
      }
    })
    document.body.classList.add(`theme-${config?.name}`)
  }
  return (
    <div>
      <Breadcrumb items={[{ key: '1', label: '首页' }]} />
      <div className='mb-6'>
        <Button onClick={() => changeTheme('green')}>Green</Button>
      </div>
      <Button onClick={() => changeTheme('violet')}>Violet</Button>
    </div>
  )
}

export default Home
