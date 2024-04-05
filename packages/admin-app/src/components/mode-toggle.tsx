import { useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import { useThemeStore } from '@/store/theme-store'

export function ModeToggle() {
  const { setTheme } = useTheme()
  const myConfig = useThemeStore(state => state.config)
  useEffect(() => {
    document.body.classList.forEach(className => {
      if (className.match(/^theme.*/)) {
        document.body.classList.remove(className)
      }
    })
    if (myConfig) {
      document.body.classList.add(`theme-${myConfig.theme}`)
      document.body.style.setProperty('--radius', `${myConfig.radius}rem`)
    }
  }, [myConfig])
  return (
    <>
      <Sun
        onClick={() => setTheme('dark')}
        className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 cursor-pointer transition-all dark:-rotate-90 dark:hidden'
      />
      <Moon
        onClick={() => setTheme('light')}
        className='h-[1.2rem] w-[1.2rem] rotate-90 hidden cursor-pointer transition-all dark:rotate-0 dark:block'
      />
      <span className='sr-only'>Toggle theme</span>
    </>
  )
}
