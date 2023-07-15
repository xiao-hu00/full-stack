import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Model from '@/components/Model'
import LoadProgress from '@/components/LoadProgress'
import Stars from '@/components/Stars'

const Component: React.FC = () => {
  return (
    <>
      <Canvas
        camera={{ fov: 45, near: 0.1, far: 100, zoom: 1 }}
      >
        {/* <Loader /> */}
        <color attach={'background'} args={['#000']} />
        <Suspense fallback={<LoadProgress />}>
          <OrbitControls makeDefault position={[0, 0, 1.5]}/>
          <Model />
          <Stars />
        </Suspense>
      </Canvas>
    </>
  )
}

export default Component
