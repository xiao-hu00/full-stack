import React, { useCallback, useEffect, useRef } from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'
import { lglt2xyz } from '../utils/index'
import waveImg from '../assets/wave.png'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

const Component: React.FC = () => {
  const [waveMap] = useLoader(TextureLoader, [waveImg])
  const waveRef = useRef<any>()

  useEffect(() => {
    waveRef.current.lookAt(0, 0, 0)
    console.log(waveRef.current)
  }, [])
  let s = 1
  useFrame((state, delta) => {
    s += (delta * 0.4)
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
  const pos = lglt2xyz(116.401107, 39.920248)
  return (
    <mesh ref={waveRef} position={[pos.x, pos.y, pos.z]}>
      <planeGeometry args={[0.3, 0.3]} />
      <meshBasicMaterial depthWrite={false} side={THREE.DoubleSide} map={waveMap} transparent={true} color={'yellow'} />
    </mesh>
  )
}

export default Component
