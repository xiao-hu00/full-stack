import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

export function ModeToggle() {
  const { setTheme } = useTheme()

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
