import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'
import lightImg from '@/assets/light_column.png'
import { useLoader } from '@react-three/fiber'

const Component: React.FC<any> = (props) => {
  const { position, color = 'yellow', flat = false } = props
  const mColor = new THREE.Color(color)
  const [lightMap] = useLoader(TextureLoader, [lightImg]) // 光柱
  // 光柱
  const groupRef = useRef<any>(null!)

  useEffect(() => {
    const node1 = groupRef.current.children[0]
    const node2 = groupRef.current.children[1]
    if (flat) {
      // 平面地图
      node1.rotateX(Math.PI * 0.5)
      node1.translateY(0.2)
      node2.rotateX(Math.PI * 0.5)
      node2.rotateY(Math.PI * 0.5)
      node2.translateY(0.2)
    } else {
      // 地球
      node1.lookAt(0, 0, 0)
      node2.lookAt(0, 0, 0)
      node1.rotateX(- Math.PI * 0.5)
      node1.translateY(0.2)
      node2.rotateX(- Math.PI * 0.5)
      node2.rotateY(Math.PI * 0.5)
      node2.translateY(0.2)
    }
  }, [])
  return (
    <group ref={groupRef}>
      {[1, 2].map((item: number) => (
        <mesh position={[position.x, position.y, position.z]} key={item}>
          <planeGeometry args={[0.12, 0.4]} />
          <meshStandardMaterial
            map={lightMap}
            side={THREE.DoubleSide}
            transparent={true}
            color={mColor}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

export default Component
