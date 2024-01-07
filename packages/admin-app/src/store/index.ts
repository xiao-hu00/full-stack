import { create } from 'zustand'
type State = {
  collapse: boolean
}

type Action = {
  updateCllapse: (collapse: State['collapse']) => void
}

export const useMenuStore = create<State & Action>((set) => ({
  collapse: false,
  updateCllapse: (collapse: boolean) => set(() => ({ collapse: collapse })),
}))