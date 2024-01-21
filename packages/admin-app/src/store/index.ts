import { create } from 'zustand'
type State = {
  collapse: boolean
  progress: number
}

type Action = {
  updateCollapse: (collapse: State['collapse']) => void
  updateProgress: (collapse: State['progress']) => void
}

export const useMenuStore = create<State & Action>((set) => ({
  collapse: false,
  updateCollapse: (collapse: boolean) => set(() => ({ collapse })),
  progress: 0,
  updateProgress: (progress: number) => set(() => ({ progress })),
}))