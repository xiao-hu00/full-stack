import React, { useRef, useEffect } from 'react'
import { lglt2xyz } from '../utils/index'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { getBezierPoint } from '../utils'

const Component: React.FC<any> = (props) => {
  // type=fly 没有轨迹线，直接飞  delay=0 延迟飞线开始的时间，单位是秒
  const { positions, type = '', delay = 0 } = props
  const settings = {
    uSpeed: { value: 20 }, // 飞线飞行速度
    uTime: { value: 0 }, // 运行时间
    uRange: { value: type === 'fly' ? 300 : 90 }, // 飞行的线的点的个数
    uNumber: { value: 800 }, // 飞线的点的总数
    uColor: { value: type === 'fly' ? new THREE.Vector3(0, 1, 1) : new THREE.Vector3(1, 1, 0) },
    isFlyOpacity: { value: type === 'fly' ? 0.0 : 0.5 },
  }
  const indexArray = Array.from({ length: settings.uNumber.value + 1 }, (_, i) => 1 + (i)).reverse()
  const lineRef = useRef<THREE.Line>(null!)
  const startPoint = lglt2xyz(positions[0][0], positions[0][1])
  const endPoint = lglt2xyz(positions[1][0], positions[1][1])
  const [v1, v2] = getBezierPoint(startPoint, endPoint)
  const line = new THREE.CubicBezierCurve3(
    startPoint,
    v1, v2,
    endPoint
  )
  const points = line.getPoints(800)
  const arr = [] as any
  points.forEach((item: any) => {
    arr.push(item.x, item.y, item.z)
  })
  const pos = new Float32Array(arr)
  const currents = new Float32Array(indexArray)
  useEffect(() => {
    const { current } = lineRef
    current.geometry.attributes.position.needsUpdate = true
    current.geometry.computeBoundingSphere()
  }, [lineRef])
  useFrame((state, delta) => {
    if (delay !== 0 && state.clock.getElapsedTime() < delay) {
       return
    }
    settings.uTime.value += delta * 10
  })
  return (
    <points ref={lineRef as any}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={pos.length / 3} array={pos} itemSize={3} />
        <bufferAttribute attach="attributes-current" array={currents} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        transparent={true}
        uniforms={settings}
        vertexShader={/* glsl */`
            varying float opacity;
            uniform float uTime;
            uniform float uRange;
            uniform float uNumber;
            uniform float uSpeed;
            attribute float current;

            void main() {
              float m = mod((current + uTime * uSpeed) + uRange, uNumber + uRange);
              opacity = step(m, uRange);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
              gl_PointSize = clamp(3. - m / uRange * 2., 1., 5.);
            }
        `}
        fragmentShader={/* glsl */`
          varying float opacity;
          uniform vec3 uColor;
          uniform float isFlyOpacity;
          void main() {
            float o = step(0.2, opacity);
            gl_FragColor = vec4(uColor, o + isFlyOpacity);
          }
        `}
      />
    </points>
  )
}

export default Component
