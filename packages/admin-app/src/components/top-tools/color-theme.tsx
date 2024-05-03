import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { themes } from './themes'
import { useThemeStore } from '@/store/theme-store'

const ColorTheme = () => {
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
      <Popover>
        <PopoverTrigger asChild>
          <div className='w-4 h-4 bg-[hsl(var(--primary))] border border-[hsl(var(--primary))]'></div>
        </PopoverTrigger>
        <PopoverContent className='p-4 w-40 grid grid-cols-3' align='end'>
          <div
            className='w-4 h-4 bg-[hsl(var(--primary))]'
            onClick={() => changeTheme('violet')}
          />
          <div
            className='w-4 h-4 bg-[hsl(var(--primary))]'
            onClick={() => changeTheme('green')}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default ColorTheme
