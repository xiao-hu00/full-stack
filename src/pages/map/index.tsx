import React, { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { projection } from '@/utils'
import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'
import gzJson from "@/assets/gzMap.json"
import './index.css'
import LightColumn from '@/components/LightColumn' // 光柱
import Circle from '@/components/Circle'
import Wave from '@/components/Wave' // 坐标点波纹
import PontPlane from '@/components/PointPlane'
import UpLine from '@/components/UpLine'
import MapCircle from '@/components/MapCircle'
import Perf from '@/components/Perf'

const Component: React.FC = () => {
  const [cityInfoList, setCityInfoList] = useState<any>([])
  const [shapes, setShapes] = useState([])
  const [linePositions, setLinePositions] = useState<any>([])
  useEffect(() => {
    initMap()
  }, [])
  const initMap = () => {
    const cityInfo = [] as any // 每个市的信息
    const cityShape = [] as any // 每一个市都绘制一个shape
    const cityPoints = [] as any // 每一个市都绘制一个多边形，存单个市边界线的坐标点
    gzJson.features.forEach((m: any) => {
      // 每个市的3d对象
      const coordinates = m.geometry.coordinates
      // 坐标循环
      coordinates.forEach((coordinate: any) => {
        // 绘制多边形
        coordinate.forEach((polygon: any) => {
          // 这里的坐标要做2次使用：1次用来构建模型，1次用来构建轮廓线
          const shape = new THREE.Shape()
          const points = [] as any
          for (let i = 0; i < polygon.length; i++) {
            const [x, y] = projection(polygon[i]) as any
            if (i === 0) {
              shape.moveTo(x, -y)
            }
            shape.lineTo(x, -y)
            points.push(x, -y, 0.11)
          }
          cityShape.push(shape)
          cityPoints.push(points)
        });
      });
      const [x, y] = projection(m.properties.center) as any
      cityInfo.push({ x, y: -y, z: 0.111 })
    });
    const allCityPoints = cityPoints.map((item: any) => (new Float32Array(item))) // N个市，循环，转化为Float32Array数组
    setLinePositions(allCityPoints)
    setShapes(cityShape)
    setCityInfoList(cityInfo)
  }
  const perfVisible = useControls({
    'performance': {
      value: false
    }
  })
  const color = useControls('设置颜色', {
    'lightColumn': {
      value: 'yellow'
    },
    'map': {
      value: 'green'
    },
    'circle': {
      value: 'white'
    },
    'upLine': {
      value: 'white'
    }
  })
  return (
    <>
      <div style={{ height: '100vh', width: '100%', backgroundColor: '#000' }}>
        <Canvas camera={{ fov: 75, near: 0.1, far: 100, zoom: 2.5 }}>
          <Perf visible={perfVisible.performance} />
          <OrbitControls makeDefault position={[0, 0, 2]}/>
          <ambientLight intensity={1.5} />
          <group rotation={[- Math.PI * 0.28, 0, 0]}>
            <mesh>
              <extrudeGeometry args={[shapes, { depth: 0.1, bevelEnabled: false }]}/>
              <meshBasicMaterial color={color.map} opacity={0.9} transparent={true} />
            </mesh>
            {linePositions.map((item: any, index: number) => (
              <group key={index}>
                <group position={[0, 0, -0.111]}>
                  <line>
                    <bufferGeometry>
                      <bufferAttribute attach="attributes-position" count={item.length / 3} array={item} itemSize={3} />
                    </bufferGeometry>
                    <lineBasicMaterial color={'#FFFFFF'} />
                  </line>
                </group>
                <line>
                  <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={item.length / 3} array={item} itemSize={3} />
                  </bufferGeometry>
                  <lineBasicMaterial color={'#FFFFFF'} />
                </line>
              </group>
            ))}
            {cityInfoList.map((item: any, index: number) => (
              <group key={index}>
                <LightColumn color={color.lightColumn} position={item} flat={true} />
                <Circle color={color.lightColumn} position={item} flat={true} />
                <Wave color={color.lightColumn} position={item} flat={true} width={0.15} />
              </group>
            ))}
            <PontPlane />
            <UpLine color={color.upLine} />
            <UpLine color={color.upLine} />
            <UpLine color={color.upLine} />
            <MapCircle color={color.circle} />
          </group>
        </Canvas>
      </div>
    </>
  )
}

export default Component
