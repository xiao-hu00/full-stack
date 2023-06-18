import React, { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const Component: React.FC<any> = (props) => {
  const { color = 'yellow' } = props
  const mColor = new THREE.Color(color)
  const ref = useRef<any>(null!)
  const tRef = useRef<any>(null!)
  const curve = new THREE.EllipseCurve(
    0, 0.2,            // ax, aY
    1.6, 1.6,           // xRadius, yRadius
    0, 2 * Math.PI,  // aStartAngle, aEndAngle
    false,            // aClockwise
    0                 // aRotation
  );
  const points = curve.getPoints(150)
  const arr = [] as any
  points.forEach((item: any) => {
    arr.push(item.x, item.y, -0.04)
  })
  const pos = new Float32Array(arr)
  const settings = useMemo(() => ({
    uTime: { value: 0 }, // 运行时间
    uColor: { value: mColor },
  }), [])
  useEffect(() => {
    settings.uColor.value = mColor
  }, [mColor])
  useFrame((state, delta) => {
    settings.uTime.value += delta
    ref.current.rotation.z += delta * 0.1 * Math.cos(state.clock.getElapsedTime())
    tRef.current.rotation.z += delta * 0.1 * Math.cos(state.clock.getElapsedTime())
  })
  return (
    <group position={[0, -0.1, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={pos.length / 3} array={pos} itemSize={3} />
        </bufferGeometry>
        <shaderMaterial
          transparent={true}
          uniforms={settings}
          vertexShader={/* glsl */`
              varying vec2 vUv;
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
                gl_PointSize = 4.;
              }
          `}
          fragmentShader={/* glsl */`
            uniform vec3 uColor;
            uniform float uTime;
            varying vec2 vUv;
            void main() {
              gl_FragColor = vec4(uColor, abs(0.7 * sin(uTime)) + 0.3 + vUv.x);
            }
          `}
        />
      </points>
      <mesh ref={tRef} rotation={[0, 0, - 0.5 * Math.PI]}>
        <torusGeometry args={[1.43, 0.015, 2, 150, 0.12 * Math.PI]} />
        <meshBasicMaterial
          color={mColor}
          transparent= {true}
          depthWrite={false}
          opacity={0.4}
        />
      </mesh>
      <mesh ref={ref} rotation={[0, 0, 0.5 * Math.PI]} position-z={-0.05}>
        <torusGeometry args={[1.8, 0.015, 2, 150, 0.12 * Math.PI]} />
        <meshBasicMaterial
          color={mColor}
          transparent= {true}
          depthWrite={false}
          opacity={0.4}
        />
      </mesh>
    </group>
  )
}

export default Component
