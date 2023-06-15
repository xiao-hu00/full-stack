import { create } from 'zustand'
import type { Color } from 'antd/es/color-picker'
interface BearState {
  color: Color | string
  setColor: (color: Color | string) => void
  markColor: Color | string
  setMarkColor: (color: Color | string) => void
  maskColor: Color | string
  setMaskColor: (color: Color | string) => void
}

const useBearStore = create<BearState>()((set) => ({
  color: 'yellow',
  setColor: (color) => set((state) => ({ color: color })),
  markColor: 'yellow',
  setMarkColor: (color) => set((state) => ({ markColor: color })),
  maskColor: 'yellow',
  setMaskColor: (color) => set((state) => ({ maskColor: color })),
}))

export default useBearStore
