import { Breadcrumb } from '@/components'
import { Button } from '@/components/ui/button'
import { themes } from './themes'
import { useThemeStore } from '@/store/theme-store'

const Home = () => {
  const setConfig = useThemeStore(state => state.setConfig)
  const myConfig = useThemeStore(state => state.config)
  const obj = themes.find(item => item.name === myConfig.theme)
  const keys = Object.keys(obj?.cssVars.light || {})
  const values = Object.values(obj?.cssVars.light || {})
  const changeTheme = (type: string) => {
    const config = themes.find(item => item.name === type)
    setConfig({ theme: config?.name, radius: 0.5 })
  }
  return (
    <div>
      <Breadcrumb items={[{ key: '1', label: '首页' }]} />
      <div>
        config: {JSON.stringify(myConfig)}
        <Button className='ml-4' onClick={() => changeTheme('green')}>
          Green
        </Button>
        <Button className='ml-4' onClick={() => changeTheme('violet')}>
          Violet
        </Button>
      </div>
      <div>色值卡：</div>
      <div>
        {keys?.map((item, index) => (
          <div key={item} className='flex gap-1 h-8 items-center'>
            <div>
              {item}: {values[index]}
            </div>
            <div
              className='h-4 w-4 ml-4 border'
              style={{ background: `hsl(${values[index]})` }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
