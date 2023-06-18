import { Canvas } from '@react-three/fiber'
import './index.css'
import Earth from '@/components/Earth' // 地球贴图和地球辉光
import LightColumn from '@/components/LightColumn' // 光柱
import Circle from '@/components/Circle'
import Wave from '@/components/Wave' // 坐标点波纹
import FlyLine from '@/components/FlyLine' // 飞线
import Pin from '@/components/Pin' // 坐标标记
import EnergyMask from '@/components/EnergyMask' // 能量光罩
import { lglt2xyz } from '@/utils'
import { OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'
import { useControls } from 'leva'
import Perf from '@/components/Perf'

// 飞线起点坐标，中心点坐标
const center = [
  [116.401107, 39.920248]
].map((item: any) => lglt2xyz(item[0], item[1]))
// 飞线终点坐标
const pointList = [
  [53.916413, 31.439865],
  [42.4365, 62.647135],
  [-73.865977, 40.851767],
  [139.771786, 35.696155],
  // [2.336124, 48.869513],
  // [-118.242445, 34.058754],
  // [103.853756, 1.326621],
  // [151.189749, -33.867381],
  // [58.309405, 22.255926],
  // [9.185958, 45.470675],
  // [-87.652572, 41.900574],
  // [37.614435, 55.76474],
  // [-46.624685, -23.545219],
  // [8.679827, 50.112769],
  // [-3.694591, 40.430836],
  // [-99.137807, 19.441335],
  // [96.681106, 3.144205],
  // [126.982568, 37.585754],
].map((item: any) => lglt2xyz(item[0], item[1]))
// 光柱坐标
const lightCol = [
  [116.401107, 46.920248],
  [116.401107, 26.920248],
  [16.401107, 16.920248],
  [86.401107, 36.920248],
  [76.401107, 32.920248],
  [56.401107, 29.920248],
  [46.401107, 66.920248],
].map((item: any) => lglt2xyz(item[0], item[1]))

// 所有波纹动画点的坐标
const allPoints = pointList.concat(center)
// 所有光点圆圈的坐标
const allCirclePoints = [...allPoints, ...lightCol]

function App() {
  const perfVisible = useControls({
    'perf': {
      value: false
    }
  })
  const color = useControls('设置颜色', {
    'lightColumn': {
      value: 'yellow'
    },
    'flyLine1': {
      value: 'yellow'
    },
    'flyLine2': {
      value: 'yellow'
    },
    'flyLine3': {
      value: 'yellow'
    },
    'mask': {
      value: 'yellow'
    },
  })
  return (
    <>
      <div id="canvas-container">
        <Canvas
          camera={{ fov: 75, near: 0.1, far: 100, zoom: 1 }}
        >
          <Perf visible={perfVisible.perf} />
          <OrbitControls makeDefault />
          <ambientLight intensity={1} />
          <group rotation={[0.4, 2.95, 0.1]}>
            <Earth />
            {lightCol.map((item: Vector3, index: number) => (
              <LightColumn color={color.lightColumn} position={item} key={index} />
            ))}
            {allCirclePoints.map((item: Vector3, index: number) => (
              <Circle position={item} key={index} color={color.lightColumn} />
            ))}
            {pointList.map((item: Vector3, index: number) => (
              <FlyLine color={color.flyLine1} positions={[center[0], item]} key={index} />
            ))}
            {allPoints.map((item: Vector3, index: number) => (
              <Wave color={color.lightColumn} position={item} key={index} />
            ))}
            <Pin position={center} />
            <FlyLine color={color.flyLine2} positions={[pointList[0], pointList[1]]} type={'fly'} />
            <FlyLine color={color.flyLine3} positions={[pointList[0], pointList[2]]} type={'fly'} delay={1} />
            <EnergyMask color={color.mask} />
          </group>
        </Canvas>
      </div>
    </>
  )
}

export default App