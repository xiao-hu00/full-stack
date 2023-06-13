import { useEffect } from 'react'
import { extend, useThree } from '@react-three/fiber'
import { OrbitControls, TransformControls } from 'three-stdlib'
extend({ OrbitControls, TransformControls })

const CameraController = () => {
  const { camera, gl } = useThree()
  useEffect(
     () => {
        const controls = new OrbitControls(camera, gl.domElement)
        controls.minDistance = 3
        controls.maxDistance = 20
        return () => {
          controls.dispose()
        };
     },
     [camera, gl]
  );
  return null
}

export default CameraController
