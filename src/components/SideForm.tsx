import React, { useState } from 'react'
import { ColorPicker } from 'antd'
import useBearStore from '../store'

const Component: React.FC = () => {
  const [color, changeColor] = useState<any>()
  const [colorMark, changeColorMark] = useState<any>()
  const [colorMask, changeColorMask] = useState<any>()

  const setColor = useBearStore((state) => state.setColor)
  const setMarkColor = useBearStore((state) => state.setMarkColor)
  const setMaskColor = useBearStore((state) => state.setMaskColor)

  const onChange = (value: any, type: 'color' | 'markColor' | 'maskColor') => {
    switch(type) {
      case 'color':
        changeColor(value)
        setColor(value)
        break
      case 'markColor':
        changeColorMark(value)
        setMarkColor(value)
        break
      case 'maskColor':
        changeColorMask(value)
        setMaskColor(value)
        break
      default:
        break
    }
  }

  return (
    <div style={{ zIndex: 9, position: 'absolute', height: '100vh', left: 0, top: 0, color: '#FFF', background: 'rgba(255, 255, 255, 0.1)', width: 180, padding: '0px 10px' }}>
      <div style={{ margin: '20px 0 10px' }}>光柱</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>颜色：</div>
        <ColorPicker value={color} onChange={(value) => onChange(value, 'color')} />
      </div>
      <div style={{ margin: '20px 0 10px' }}>坐标标记</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>颜色：</div>
        <ColorPicker value={colorMark} onChange={(value) => onChange(value, 'markColor')} />
      </div>
      <div style={{ margin: '20px 0 10px' }}>能量光罩</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>颜色：</div>
        <ColorPicker value={colorMask} onChange={(value) => onChange(value, 'maskColor')} />
      </div>
    </div>
  )
}

export default Component
