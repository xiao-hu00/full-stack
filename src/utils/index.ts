import * as THREE from 'three'

//threejs自带的经纬度转换
export const lglt2xyz = (lng: any, lat: any) => {
  const theta = (90 + lng) * (Math.PI / 180);
  const phi = (90 - lat) * (Math.PI / 180);
  return new THREE.Vector3().setFromSpherical(
    new THREE.Spherical(2, phi, theta)
  );
}