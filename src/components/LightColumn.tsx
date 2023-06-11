import React, { useCallback } from 'react'
import * as THREE from 'three'
import { lglt2xyz } from '../utils/index'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'
import lightImg from '../assets/light_column.png'
import { useLoader } from '@react-three/fiber'

const Component: React.FC = () => {
  const [lightMap] = useLoader(TextureLoader, [lightImg]) // 光柱
  // 光柱
  const pos = lglt2xyz(116.401107, 39.920248)
  const groupRef = useCallback((node: any) => {
    if (!node) return
    console.log(node)
    const node1 = node.children[0]
    const node2 = node.children[1]
    node1.lookAt(0, 0, 0)
    node1.rotateX(- Math.PI * 0.5)
    node1.translateY(0.2)
    node2.lookAt(0, 0, 0)
    node2.rotateX(- Math.PI * 0.5)
    node2.rotateY(Math.PI * 0.5)
    node2.translateY(0.2)
  }, [])
  return (
    <group ref={groupRef}>
      <mesh position={[pos.x, pos.y, pos.z]}>
        <planeGeometry args={[0.15, 0.45]} />
        <meshStandardMaterial
          map={lightMap}
          side={THREE.DoubleSide}
          transparent={true}
          color={'lightyellow'}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[pos.x, pos.y, pos.z]}>
        <planeGeometry args={[0.15, 0.45]} />
        <meshStandardMaterial
          map={lightMap}
          side={THREE.DoubleSide}
          transparent={true}
          color={'lightyellow'}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

export default Component
