import { useGLTF } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'
import bakedImg from '@/assets/baked.jpg'
import * as THREE from 'three'

export default function Model(props: any) {
  const { nodes }: any = useGLTF('/study.glb')
  console.log('nodes:',nodes)
  const bakedMap: THREE.Texture = useLoader(TextureLoader, bakedImg) // 地球
  bakedMap.flipY = false
  bakedMap.colorSpace = THREE.SRGBColorSpace
  const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 })
  const material = new THREE.MeshBasicMaterial({ map: bakedMap })
  return (
    <group {...props} dispose={null} rotation={[Math.PI * 0.2, - 0.2, 0]}>
      <group>
        {Object.keys(nodes).map((item, index) => {
          if (!nodes[item].geometry) return null
          if (nodes[item].name === 'Cube031' || nodes[item].name === 'Cube037' || nodes[item].name === 'Circle') {
            return (
              <mesh
                key={index}
                geometry={nodes[item].geometry}
                position={nodes[item].position}
                rotation={nodes[item].rotation}
                material={pointMaterial}
              />
            )
          }
          return (
            <mesh
              key={index}
              geometry={nodes[item].geometry}
              position={nodes[item].position}
              rotation={nodes[item].rotation}
              material={material}
            />
          )
        })}
      </group>
    </group>
  )
}

// useGLTF.preload('/study.glb')