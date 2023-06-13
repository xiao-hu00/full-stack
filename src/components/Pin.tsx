import React, { useEffect, useRef } from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'
import earthImg from '../assets/matcap1-64px.png'
import { useFrame, useLoader } from '@react-three/fiber'
import { lglt2xyz } from '../utils/index'
import * as THREE from 'three'

const Component: React.FC<any> = (props) => {
  const { position } = props
  const coneRef = useRef<any>(null!)
  const sRef = useRef<any>(null!)
  const centerPos = lglt2xyz(position[0], position[1])
  const [matcap] = useLoader(TextureLoader, [earthImg]) // 地球
  const rayLine = new THREE.Ray(new THREE.Vector3(0, 0, 0), new THREE.Vector3(centerPos.x, centerPos.y, centerPos.z))
  const top = rayLine.at(1.04, new THREE.Vector3(0, 0, 0))
  const top1 = rayLine.at(1.08, new THREE.Vector3(0, 0, 0))
  useEffect(() => {
    coneRef.current.lookAt(0, 0, 0)
    coneRef.current.rotation.x = Math.PI * 0.8
  }, [])
  useFrame((state, delta) => {
    // pin 上下来回运动
    const n = Math.sin(state.clock.getElapsedTime()) * delta * 0.05
    coneRef.current.position.y += n
    sRef.current.position.y += n
  })
  return (
    <>
      <mesh ref={coneRef} position={[top.x, top.y, top.z]}>
        <coneGeometry args={[0.04, 0.1, 4]} />
        <meshMatcapMaterial matcap={matcap} />
      </mesh>
      <mesh ref={sRef} position={[top1.x, top1.y, top1.z]}>
        <sphereGeometry args={[0.02, 20, 20]} />
        <meshMatcapMaterial matcap={matcap} />
      </mesh>
    </>
  )
}

export default Component
