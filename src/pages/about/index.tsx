import React from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import threePx from '@/assets/3px.png'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'
import * as THREE from 'three'

const Component: React.FC = () => {
  const threeMap: THREE.Texture = useLoader(TextureLoader, threePx)
  threeMap.magFilter = THREE.NearestFilter
  // const 
  return (
    <div style={{ height: '100%', overflow: 'scroll' }}>
      <div style={{ position: 'absolute', background: '#000', height: 'calc(100vh-42px)' , width: '100%', top: 42 }}>
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
      <Canvas style={{ position: 'fixed', width: '100%', height: '100%', top: 42, zIndex: 1 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[1, 0, 0]} />
        <mesh position={[0, -2, 0]}>
          <torusGeometry args={[1, 0.25, 6, 80]} />
          <meshToonMaterial
            gradientMap={threeMap}
            transparent={true}
            color={'hotpink'}
          />
        </mesh>
        <mesh position={[0, 12, 0]}>
          <torusGeometry args={[1, 0.25, 6, 80]} />
          <meshToonMaterial
            gradientMap={threeMap}
            transparent={true}
            color={'hotpink'}
          />
        </mesh>
      </Canvas>
    </div>
  )
}

export default Component
