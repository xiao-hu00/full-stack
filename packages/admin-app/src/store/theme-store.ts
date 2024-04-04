import { create } from 'zustand'
import { Theme } from '@/pages/home/themes'
import { persist } from 'zustand/middleware'

type Config = {
  theme?: Theme['name']
  radius?: number
}

type State = {
  config: Config
  setConfig: (config: Config) => void
}

export const useThemeStore = create<State>()(
  persist(
    set => ({
      config: {
        theme: 'zinc',
        radius: 0.5,
      },
      setConfig: (config: Config) => set(() => ({ config })),
    }),
    {
      name: 'theme',
    }
  )
)
