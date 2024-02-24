import React, { useEffect, useMemo } from 'react'
import * as THREE from 'three'

const Component: React.FC<any> = (props) => {
  // type=fly 没有轨迹线，直接飞  delay=0 延迟飞线开始的时间，单位是秒
  const { color = 'yellow' } = props
  const mColor = new THREE.Color(color)
  const ratio = Math.min(window.devicePixelRatio, 2)
  const settings = useMemo(() => ({
    uTime: { value: 0 }, // 运行时间
    uColor: { value: mColor },
    pixelRatio: { value: ratio },
  }), [])
  useEffect(() => {
    settings.uColor.value = mColor
  }, [mColor])

  const points = [
    [0, 1, 1],
    [1.5, 0.5, 1.5],
  ]
  const arr = [] as any
  points.forEach((item: any) => {
    arr.push(item[0], item[1], item[2])
  })
  const pos = new Float32Array(arr)
  
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={pos.length / 3} array={pos} itemSize={3} />
      </bufferGeometry>
      <shaderMaterial
        transparent={true}
        depthWrite={false}
        uniforms={settings}
        vertexShader={/* glsl */`
            varying vec2 vUv;
            uniform float pixelRatio;
            void main() {
              vUv = uv;
              gl_PointSize = 40.0 * pixelRatio;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
            }
        `}
        fragmentShader={/* glsl */`
          varying vec2 vUv;
          void main() {
            float dis = distance(gl_PointCoord, vec2(0.5));
            float strength = 0.05 / dis - 0.05 * 2.;
            gl_FragColor = vec4(1., 1., 1., strength);
          }
        `}
      />
    </points>
  )
}

export default Component
