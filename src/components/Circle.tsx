import React, { useEffect, useRef } from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'
import { lglt2xyz } from '../utils/index'
import gradientImg from '../assets/gradient.png'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

const Component: React.FC<any> = (props) => {
  const { position, color } = props
  const pos = lglt2xyz(position[0], position[1])
  const [gradientMap] = useLoader(TextureLoader, [gradientImg])
  const planeRef = useRef<any>(null!)
  const torusRef = useRef<any>(null!)

  useEffect(() => {
    planeRef.current.lookAt(0, 0, 0)
    torusRef.current.lookAt(0, 0, 0)
  }, [])
  return (
    <>
      <mesh ref={planeRef} position={[pos.x, pos.y, pos.z]}>
        <planeGeometry args={[0.03, 0.03]} />
        <meshBasicMaterial map={gradientMap} side={THREE.DoubleSide} transparent={true} color={color} />
      </mesh>
      <mesh ref={torusRef} position={[pos.x, pos.y, pos.z]}>
        <torusGeometry args={[0.025, 0.002, 2, 64]} />
        <meshBasicMaterial depthWrite={false} color={color} />
      </mesh>
    </>
  )
}

export default Component
