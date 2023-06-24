import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Model from '@/components/Model'
import * as THREE from 'three'

const Component: React.FC = () => {
  return (
    <>
      <div style={{ height: '100vh', width: '100%', backgroundColor: '#000' }}>
        <Canvas gl={{ outputColorSpace: THREE.SRGBColorSpace }}>
          <OrbitControls makeDefault position={[0, 0, 2]}/>
          <Model />
        </Canvas>
      </div>
    </>
  )
}

export default Component
