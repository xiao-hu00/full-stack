import { create } from 'zustand'

type menuItem = {
  title: string
  url: string
}

type State = {
  openMenuList?: menuItem[]
}

type Action = {
  deleteOpenMenu: (item: menuItem) => void
  addOpenMenu: (item: menuItem) => void
  cleanOpenMenu: () => void
}

export const useOpenMenuStore = create<State & Action>(set => ({
  openMenuList: [],
  deleteOpenMenu: (item: menuItem) =>
    set(state => ({
      openMenuList: state.openMenuList?.filter(m => m.title !== item.title),
    })),
  addOpenMenu: (item: menuItem) =>
    set(state => {
      const obj = state.openMenuList?.find(m => m.title === item.title)
      const list = state.openMenuList
      if (!obj) {
        list?.push(item)
      }
      return {
        openMenuList: list,
      }
    }),
  cleanOpenMenu: () => set(() => ({ openMenuList: [] })),
}))
