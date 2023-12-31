import React, { useMemo, useRef, useEffect } from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'
import maskImg from '../assets/repeat.png'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

const Component: React.FC<any> = (props) => {
  const { color = 'hotpink' } = props
  const ref = useRef<any>(null!)
  const [maskMap] = useLoader(TextureLoader, [maskImg])
  const mColor = new THREE.Color(color)
  const settings = useMemo(() => ({
      bgTexture: { value: maskMap },
      uTime: { value: 0 }, // 运行时间
      uColor: { value: mColor },
  }), [])
  useEffect(() => {
    settings.uColor.value = mColor
  }, [mColor])
  maskMap.wrapS = THREE.MirroredRepeatWrapping;
  maskMap.wrapT = THREE.MirroredRepeatWrapping;
  useFrame((_, delta) => {
    settings.uTime.value += delta * 5
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2.3, 80, 80, 0, Math.PI * 2, 0, Math.PI * 2]} />
      <shaderMaterial
        uniforms={settings}
        vertexShader={/* glsl */`
          uniform float uTime;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
          }
        `}
        fragmentShader={/* glsl */`
          varying vec2 vUv;
          uniform float uTime;
          uniform vec3 uColor;
          uniform sampler2D bgTexture;
          void main() {
            vec2 vUv1 = vUv - vec2(0.5) - 0.5 * vec2(fract(uTime * 0.01));
            vec4 background = texture2D(bgTexture, vUv1);
            float opacity = background.a;
            gl_FragColor = vec4(uColor, opacity * 0.2);
          }
        `}
        depthWrite={false}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export default Component
