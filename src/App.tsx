import { Canvas, extend, useThree } from '@react-three/fiber'
import './App.css'
import { useEffect } from 'react'
import { OrbitControls, TransformControls } from 'three-stdlib'
import Earth from './components/Earth'
import LightColumn from './components/LightColumn'
import Wave from './components/Wave'
import FlyLine from './components/FlyLine'

extend({ OrbitControls, TransformControls })

const CameraController = () => {
  const { camera, gl } = useThree()
  useEffect(
     () => {
        const controls = new OrbitControls(camera, gl.domElement)
        controls.minDistance = 3
        controls.maxDistance = 20
        return () => {
          controls.dispose()
        };
     },
     [camera, gl]
  );
  return null
}

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
          <LightColumn />
          <Wave />
          <FlyLine />
        </group>
      </Canvas>
    </div>
  )
}

export default App