import { themes } from '../../components/top-tools/themes'
import { useThemeStore } from '@/store/theme-store'
type Theme = 'dark' | 'light'

const Home = () => {
  const myConfig = useThemeStore(state => state.config)
  const obj = themes.find(item => item.name === myConfig.theme)
  const themeName = localStorage.getItem('vite-ui-theme') as Theme
  const keys = Object.keys(obj?.cssVars[themeName] || {})
  const values = Object.values(obj?.cssVars[themeName] || {})
  return (
    <div className='p-4'>
      <div>config: {JSON.stringify(myConfig)}</div>
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
