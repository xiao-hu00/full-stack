import React from 'react'
import { Canvas } from '@react-three/fiber'

const Component: React.FC = () => {
  return (
    <>
      <Canvas>
        <mesh>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color={'hotpink'} />
        </mesh>
      </Canvas>
    </>
  )
}

export default Component
