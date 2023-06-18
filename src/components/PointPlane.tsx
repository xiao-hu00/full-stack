import React, { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const Component: React.FC<any> = (props) => {
  const { color = 'yellow' } = props
  const mColor = new THREE.Color(color)

  const settings = useMemo(() => ({
    uTime: { value: 0 }, // 运行时间
    uNumber: { value: 800 }, // 飞线的点的总数
    uColor: { value: mColor },
  }), [])
  useEffect(() => {
    settings.uColor.value = mColor
  }, [mColor])
  useFrame((state, delta) => {
    settings.uTime.value += delta * 10
  })
  return (
    <points>
      <planeGeometry args={[2.8, 2.8, 64, 64]} />
      <shaderMaterial
        transparent={true}
        uniforms={settings}
        vertexShader={/* glsl */`
            uniform float uTime;
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
              gl_PointSize = 2.8;
            }
        `}
        fragmentShader={/* glsl */`
          uniform vec3 uColor;
          varying vec2 vUv;
          uniform float uTime;
          void main() {
            float o = step(length(vUv - vec2(0.5)), 0.5);
            gl_FragColor = vec4(vec3(vUv.x + sin(uTime * 0.05), vUv.x, vUv.y + sin(uTime * 0.1)), o);
          }
        `}
      />
    </points>
  )
}

export default Component
