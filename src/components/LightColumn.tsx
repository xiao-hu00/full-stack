import React, { useCallback, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { lglt2xyz } from '../utils/index'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'
import lightImg from '../assets/light_column.png'
import { useLoader } from '@react-three/fiber'

const Component: React.FC<any> = (props) => {
  const { position } = props
  const [lightMap] = useLoader(TextureLoader, [lightImg]) // 光柱
  // 光柱
  const pos = lglt2xyz(position[0], position[1])
  const groupRef = useRef<any>(null!)

  useEffect(() => {
    const node1 = groupRef.current.children[0]
    const node2 = groupRef.current.children[1]
    node1.lookAt(0, 0, 0)
    node1.rotateX(- Math.PI * 0.5)
    node1.translateY(0.15)
    node2.lookAt(0, 0, 0)
    node2.rotateX(- Math.PI * 0.5)
    node2.rotateY(Math.PI * 0.5)
    node2.translateY(0.15)
  }, [])
  return (
    <group ref={groupRef}>
      {[1, 2].map((item: number) => (
        <mesh position={[pos.x, pos.y, pos.z]} key={item}>
          <planeGeometry args={[0.15, 0.45]} />
          <meshStandardMaterial
            map={lightMap}
            side={THREE.DoubleSide}
            transparent={true}
            color={'lightyellow'}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

export default Component
