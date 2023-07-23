import React from 'react'
import { Canvas } from '@react-three/fiber'
import {
  useGLTF,
  Environment,
  Float,
  PresentationControls,
  ContactShadows,
} from '@react-three/drei'

const Component: React.FC = () => {
  const { scene } = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf'
  )
  return (
    <>
      <Canvas camera={{ zoom: 1.5 }}>
        <Environment preset='city' />
        <color attach={'background'} args={['#241a1a']} />

        <PresentationControls
          global
          rotation={[0.13, 0.1, 0]}
          polar={[-0.4, 0.2]}
          azimuth={[-1, 0.75]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 2, tension: 400 }}
        >
          <Float rotationIntensity={0.4}>
            <primitive object={scene} position-y={-1.2} />
          </Float>
        </PresentationControls>
        <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
      </Canvas>
    </>
  )
}

export default Component
