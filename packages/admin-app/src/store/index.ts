import { create } from 'zustand'
type State = {
  collapse: boolean
}

type Action = {
  updateCollapse: (collapse: State['collapse']) => void
}

export const useMenuStore = create<State & Action>((set) => ({
  collapse: false,
  updateCollapse: (collapse: boolean) => set(() => ({ collapse: collapse })),
}))