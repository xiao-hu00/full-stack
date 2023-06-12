import React, { useRef, useEffect } from 'react'
import { lglt2xyz } from '../utils/index'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { getBezierPoint } from '../utils'

const settings = {
  uSpeed: { value: 20 }, // 飞线飞行速度
  uTime: { value: 0 }, // 运行时间
  uRange: { value: 90 }, // 飞行的线的点的个数
  uNumber: { value: 800 }, // 飞线的点的总数
  uColor: { value: new THREE.Vector3(1, 1, 0) },
}
const indexArray = Array.from({ length: settings.uNumber.value + 1 }, (_, i) => 1 + (i)).reverse()

const Component: React.FC = () => {
  const lineRef = useRef<THREE.Line>(null!)
  const startPoint = lglt2xyz(116.401107, 39.920248)
  const endPoint = lglt2xyz(146.401107, 29.920248)
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
  const positions = new Float32Array(arr)
  const currents = new Float32Array(indexArray)
  useEffect(() => {
    const { current } = lineRef
    current.geometry.attributes.position.needsUpdate = true
    current.geometry.computeBoundingSphere()
  }, [lineRef])
  useFrame((state, delta) => {
    settings.uTime.value += delta * 10
  })
  return (
    <points ref={lineRef as any}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
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
          void main() {
            float o = step(0.2, opacity);
            gl_FragColor = vec4(uColor, o + 0.5);
          }
        `}
      />
    </points>
  )
}

export default Component
