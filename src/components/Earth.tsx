import React from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'
import earthImg from '../assets/earth_3.jpg'
import { useLoader } from '@react-three/fiber'

const Component: React.FC = () => {
  const [earthMap] = useLoader(TextureLoader, [earthImg]) // 地球
  return (
    <mesh>
      <sphereGeometry args={[2, 80, 80]} />
      <meshStandardMaterial map={earthMap} />
    </mesh>
  )
}

export default Component
