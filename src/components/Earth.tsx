import React from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'
import earthImg from '../assets/earth_3.jpg'
import apertureImg from '../assets/earth_aperture.png'
import { useLoader } from '@react-three/fiber'

const Component: React.FC = () => {
  const [earthMap, apertureMap] = useLoader(TextureLoader, [earthImg, apertureImg]) // 地球
  return (
    <>
      <sprite scale={[6, 6, 1]}>
        <spriteMaterial map={apertureMap} opacity={0.7} transparent={true} depthWrite={false} />
      </sprite>
      <mesh>
        <sphereGeometry args={[2, 80, 80]} />
        <meshStandardMaterial map={earthMap} />
      </mesh>
    </>
  )
}

export default Component
