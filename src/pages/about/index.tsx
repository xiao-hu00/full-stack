import React from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import threePx from '@/assets/3px.png'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'
import * as THREE from 'three'
import { useScroll } from 'ahooks'

const Component: React.FC = () => {
  const threeMap: THREE.Texture = useLoader(TextureLoader, threePx)
  threeMap.magFilter = THREE.NearestFilter
  const scroll = useScroll(document) as {
    top: number
    left: number
  }
  const wh = window.innerHeight
  const positionY = scroll?.top > 0 ? (scroll?.top / wh) * 8 : 0
  // const mouse = useMouse()
  // const cx = mouse.screenX / window.innerWidth
  // const cy = mouse.screenY / window.innerHeight
  return (
    <div style={{ height: '100%', overflow: 'scroll' }}>
      <div
        style={{
          position: 'absolute',
          background: '#000',
          width: '100%',
          top: 42,
        }}
      >
        <div style={{ color: '#FFF' }} className='h-[100vh] text-3xl'>
          HELLO
        </div>
        <div style={{ color: '#FFF' }} className='h-[100vh] text-3xl'>
          HELLO
        </div>
        <div style={{ color: '#FFF' }} className='h-[100vh] text-3xl'>
          HELLO
        </div>
      </div>
      <Canvas
        camera={{
          fov: 30,
          near: 0.1,
          far: 100,
          zoom: 0.3,
        }}
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          top: 42,
          zIndex: 1,
        }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[1, 0, 0]} />
        <group position={[0, positionY, 0]}>
          <mesh position={[0, 2, 0]}>
            <torusGeometry args={[1, 0.25, 6, 80]} />
            <meshToonMaterial
              gradientMap={threeMap}
              transparent={true}
              color={'hotpink'}
            />
          </mesh>
          <mesh position={[0, -6, 0]}>
            <torusGeometry args={[1, 0.25, 6, 80]} />
            <meshToonMaterial
              gradientMap={threeMap}
              transparent={true}
              color={'hotpink'}
            />
          </mesh>
        </group>
      </Canvas>
    </div>
  )
}

export default Component
