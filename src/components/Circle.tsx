import React, { useEffect, useRef } from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'
import gradientImg from '../assets/gradient.png'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

const Component: React.FC<any> = (props) => {
  const { position, color, flat = false } = props
  const [gradientMap] = useLoader(TextureLoader, [gradientImg])
  const planeRef = useRef<any>(null!)
  const torusRef = useRef<any>(null!)
  useEffect(() => {
    if (flat) {

    } else {
      planeRef.current.lookAt(0, 0, 0)
      torusRef.current.lookAt(0, 0, 0)
    }
  }, [])
  return (
    <>
      <mesh ref={planeRef} position={[position.x, position.y, position.z]}>
        <planeGeometry args={[0.03, 0.03]} />
        <meshBasicMaterial map={gradientMap} depthTest={false} depthWrite={false} side={THREE.DoubleSide} transparent={true} color={color} />
      </mesh>
      <mesh ref={torusRef} position={[position.x, position.y, position.z]}>
        <torusGeometry args={[0.025, 0.002, 2, 64]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </>
  )
}

export default Component
