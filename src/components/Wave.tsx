import React, { useEffect, useRef } from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'
import waveImg from '@/assets/wave.png'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

const Component: React.FC<any> = (props) => {
  const { position, color = 'yellow', flat = false, width = 0.3 } = props
  const mColor = new THREE.Color(color)
  const waveMap = useLoader(TextureLoader, waveImg)
  const waveRef = useRef<any>(null!)

  useEffect(() => {
    !flat && waveRef.current.lookAt(0, 0, 0)
  }, [])
  let s = 1
  useFrame((state, delta) => {
    s += (delta * 0.4)
    // console.log(delta)
    waveRef.current.scale.x = s * 0.7
    waveRef.current.scale.y = s * 0.7
    if (s <= 1.5) {
      //s=1，透明度=0 s=1.5，透明度=1
      waveRef.current.material.opacity = (s - 1) * 2
    } else if (s > 1.5 && s <= 2) {
      //s=1.5，透明度=1 s=2，透明度=0
      waveRef.current.material.opacity = 1 - (s - 1.5) * 2
    } else {
      s = 1
    }
  })
  return (
    <mesh ref={waveRef} position={[position.x, position.y, position.z]}>
      <planeGeometry args={[width, width]} />
      <meshBasicMaterial depthWrite={false} side={THREE.DoubleSide} map={waveMap} transparent={true} color={mColor} />
    </mesh>
  )
}

export default Component
