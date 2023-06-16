import React, { useState } from 'react'
import { ColorPicker } from 'antd'
import useBearStore from '../store'
import './SideForm.css'

import type { Color } from 'antd/es/color-picker'
type colorType = 'color' | 'markColor' | 'maskColor' | 'flyColor' | 'flyColor2' | 'flyColor3' | 'waveColor'
const Component: React.FC = () => {
  const [color, changeColor] = useState<Color | string>()
  const [colorMark, changeColorMark] = useState<Color | string>()
  const [colorMask, changeColorMask] = useState<Color | string>()
  const [colorWave, changeColorWave] = useState<Color | string>()
  const [colorFly, changeColorFly] = useState<Color | string>()
  const [colorFly2, changeColorFly2] = useState<Color | string>()
  const [colorFly3, changeColorFly3] = useState<Color | string>()

  const setColor = useBearStore((state) => state.setColor)
  const setMarkColor = useBearStore((state) => state.setMarkColor)
  const setMaskColor = useBearStore((state) => state.setMaskColor)
  const setWaveColor = useBearStore((state) => state.setWaveColor)
  const setFlyColor = useBearStore((state) => state.setFlyColor)
  const setFlyColor2 = useBearStore((state) => state.setFlyColor2)
  const setFlyColor3 = useBearStore((state) => state.setFlyColor3)

  const onChange = (value: Color, type: colorType) => {
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
      case 'waveColor':
        changeColorWave(value)
        setWaveColor(value)
        break
      case 'flyColor':
        changeColorFly(value)
        setFlyColor(value)
        break
      case 'flyColor2':
        changeColorFly2(value)
        setFlyColor2(value)
        break
      case 'flyColor3':
        changeColorFly3(value)
        setFlyColor3(value)
        break
      default:
        break
    }
  }

  return (
    <div className='side'>
      <div className='side-title' style={{ marginTop: 50 }}>光柱</div>
      <div className='side-item'>
        <div>颜色：</div>
        <ColorPicker value={color} defaultValue={'yellow'} onChange={(value) => onChange(value, 'color')} />
      </div>
      <div className='side-title'>坐标标记</div>
      <div className='side-item'>
        <div>颜色：</div>
        <ColorPicker value={colorMark} defaultValue={'yellow'} onChange={(value) => onChange(value, 'markColor')} />
      </div>
      <div className='side-title'>波纹动画</div>
      <div className='side-item'>
        <div>颜色：</div>
        <ColorPicker value={colorWave} defaultValue={'yellow'} onChange={(value) => onChange(value, 'waveColor')} />
      </div>
      <div className='side-title'>能量光罩</div>
      <div className='side-item'>
        <div>颜色：</div>
        <ColorPicker value={colorMask} defaultValue={'yellow'} onChange={(value) => onChange(value, 'maskColor')} />
      </div>
      <div className='side-title'>飞线组1</div>
      <div className='side-item'>
        <div>颜色：</div>
        <ColorPicker value={colorFly} defaultValue={'yellow'} onChange={(value) => onChange(value, 'flyColor')} />
      </div>
      <div className='side-title'>飞线组2</div>
      <div className='side-item'>
        <div>颜色：</div>
        <ColorPicker value={colorFly2} defaultValue={'yellow'} onChange={(value) => onChange(value, 'flyColor2')} />
      </div>
      <div className='side-title'>飞线组3</div>
      <div className='side-item'>
        <div>颜色：</div>
        <ColorPicker value={colorFly3} defaultValue={'yellow'} onChange={(value) => onChange(value, 'flyColor3')} />
      </div>
    </div>
  )
}

export default Component
