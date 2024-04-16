import { create } from 'zustand'

export type menuItem = {
  title: string
  path: string
}

type State = {
  openMenuList: menuItem[]
}

type Action = {
  deleteOpenMenu: (item: menuItem) => void
  addOpenMenu: (item: menuItem) => void
  cleanOpenMenu: () => void
  updateOpenMenu: (items: menuItem[]) => void
}

export const useOpenMenuStore = create<State & Action>(set => ({
  openMenuList: [],
  deleteOpenMenu: (item) =>
    set(state => ({
      openMenuList: state.openMenuList?.filter(m => m.title !== item.title),
    })),
  updateOpenMenu: (items) =>
    set(() => ({
      openMenuList: items,
    })),
  addOpenMenu: (item) =>
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
