import { Canvas } from '@react-three/fiber'
import './App.css'
import CameraController from './components/CameraController'
import Earth from './components/Earth'
import LightColumn from './components/LightColumn'
import Wave from './components/Wave'
import FlyLine from './components/FlyLine'
import Pin from './components/Pin'

// 飞线起点坐标，中心点坐标
const center = [116.401107, 39.920248]
// 飞线终点坐标
const pointList = [
  [53.916413, 31.439865],
  [42.4365, 62.647135],
  [-73.865977, 40.851767],
  [139.771786, 35.696155],
  [2.336124, 48.869513],
  [-118.242445, 34.058754],
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
]
// 光柱坐标
const lightCol = [
  [116.401107, 46.920248],
  [116.401107, 26.920248],
  [16.401107, 16.920248],
  [86.401107, 36.920248],
  [76.401107, 32.920248],
  [56.401107, 29.920248],
  [46.401107, 66.920248],
]

// 所有波纹动画点的坐标
const allPoints = [...pointList, center]

function App() {
  return (
    <div id="canvas-container">
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 100, zoom: 1 }}
      >
        <CameraController />
        <ambientLight intensity={1} />
        <group rotation={[0.4, 2.95, 0.1]}>
          <Earth />
          {lightCol.map((item: Array<number>, index: number) => (
            <LightColumn position={item} key={index} />
          ))}
          {pointList.map((item: Array<number>, index: number) => (
            <FlyLine positions={[center, item]} key={index} />
          ))}
          {allPoints.map((item: Array<number>, index: number) => (
            <Wave position={item} key={index} />
          ))}
          <Pin position={center} />
        </group>
      </Canvas>
    </div>
  )
}

export default App