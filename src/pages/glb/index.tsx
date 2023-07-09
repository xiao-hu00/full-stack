import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Model from '@/components/Model'
import LoadProgress from '@/components/LoadProgress'
import Stars from '@/components/Stars'

const Component: React.FC = () => {
  return (
    <>
      <div style={{ height: '100vh', width: '100%', backgroundColor: '#000' }}>
        <Canvas
          camera={{ fov: 45, near: 0.1, far: 100, zoom: 1 }}
        >
          {/* <Loader /> */}
          <Suspense fallback={<LoadProgress />}>
            <OrbitControls makeDefault position={[0, 0, 1.5]}/>
            <Model />
            <Stars />
          </Suspense>
        </Canvas>
      </div>
    </>
  )
}

export default Component
