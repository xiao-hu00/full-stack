import React, { useMemo } from 'react'
import { range } from '@/utils'
import { useFrame } from '@react-three/fiber'

const Component: React.FC = () => {
  const count = 1000
  const positions = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const velocity = new Float32Array(count)
  const distance = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    positions[i3 + 0] = 0
    positions[i3 + 1] = 2 * (Math.random() - 0.5)
    positions[i3 + 2] = 0
    sizes[i] = range(1, 10)
    velocity[i] = range(0.1, 1)
    distance[i] = range(0.1, 0.5)
  }
  const settings = useMemo(() => ({
    uTime: { value: 0 }, // 运行时间
  }), [])
  useFrame((_, delta) => {
    settings.uTime.value += delta * 2
  })
  return (
    <>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-aSize" array={sizes} itemSize={1} />
          <bufferAttribute attach="attributes-aVelocity" array={velocity} itemSize={1} />
          <bufferAttribute attach="attributes-aDistance" array={distance} itemSize={1} />
        </bufferGeometry>
        <shaderMaterial
          transparent={true}
          uniforms={settings}
          vertexShader={/* glsl */`
              uniform float uTime;
              attribute float aSize;
              attribute float aVelocity;
              attribute float aDistance;
  
              void main() {
                vec3 pos = position;
                pos.x = mod(0.4*uTime*aVelocity, aDistance);
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.);
                gl_PointSize = aSize * (1. / - mvPosition.z) * 0.5;
                gl_Position = projectionMatrix * mvPosition;
              }
          `}
          fragmentShader={/* glsl */`
            void main() {
              if (length(gl_PointCoord.xy - vec2(0.5)) > 0.5) discard;
              gl_FragColor = vec4(1., 0., 0., 1.);
            }
          `}
        />
      </points>
    </>
  )
}

export default Component
