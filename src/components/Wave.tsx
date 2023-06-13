import React, { useEffect, useRef } from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'
import { lglt2xyz } from '../utils/index'
import waveImg from '../assets/wave.png'
import gradientImg from '../assets/gradient.png'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

const Component: React.FC<any> = (props) => {
  const { position } = props
  const pos = lglt2xyz(position[0], position[1])
  const [waveMap, gradientMap] = useLoader(TextureLoader, [waveImg, gradientImg])
  const waveRef = useRef<any>(null!)
  const planeRef = useRef<any>(null!)
  const torusRef = useRef<any>(null!)

  useEffect(() => {
    waveRef.current.lookAt(0, 0, 0)
    planeRef.current.lookAt(0, 0, 0)
    torusRef.current.lookAt(0, 0, 0)
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
    <>
      <mesh ref={planeRef} position={[pos.x, pos.y, pos.z]}>
        <planeGeometry args={[0.03, 0.03]} />
        <meshBasicMaterial map={gradientMap} side={THREE.DoubleSide} transparent={true} color={'yellow'} />
      </mesh>
      <mesh ref={torusRef} position={[pos.x, pos.y, pos.z]}>
        <torusGeometry args={[0.025, 0.002, 2, 64]} />
        <meshBasicMaterial depthWrite={false} color={'yellow'} />
      </mesh>
      <mesh ref={waveRef} position={[pos.x, pos.y, pos.z]}>
        <planeGeometry args={[0.3, 0.3]} />
        <meshBasicMaterial depthWrite={false} side={THREE.DoubleSide} map={waveMap} transparent={true} color={'yellow'} />
      </mesh>
    </>
  )
}

export default Component
