import { create } from 'zustand'
import type { Color } from 'antd/es/color-picker'
interface BearState {
  color: Color | string
  setColor: (color: Color | string) => void
  markColor: Color | string
  setMarkColor: (color: Color | string) => void
  maskColor: Color | string
  setMaskColor: (color: Color | string) => void
  waveColor: Color | string
  setWaveColor: (color: Color | string) => void
  flyColor: Color | string
  setFlyColor: (color: Color | string) => void
  flyColor2: Color | string
  setFlyColor2: (color: Color | string) => void
  flyColor3: Color | string
  setFlyColor3: (color: Color | string) => void
}

const useBearStore = create<BearState>()((set) => ({
  color: 'yellow',
  setColor: (color) => set((state) => ({ color: color })),
  markColor: 'yellow',
  setMarkColor: (color) => set((state) => ({ markColor: color })),
  maskColor: 'yellow',
  setMaskColor: (color) => set((state) => ({ maskColor: color })),
  waveColor: 'yellow',
  setWaveColor: (color) => set((state) => ({ waveColor: color })),
  flyColor: 'yellow',
  setFlyColor: (color) => set((state) => ({ flyColor: color })),
  flyColor2: 'yellow',
  setFlyColor2: (color) => set((state) => ({ flyColor2: color })),
  flyColor3: 'yellow',
  setFlyColor3: (color) => set((state) => ({ flyColor3: color })),
}))

export default useBearStore
