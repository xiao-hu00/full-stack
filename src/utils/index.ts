import * as THREE from 'three'

//threejs自带的经纬度转换
export const lglt2xyz = (lng: any, lat: any) => {
  const theta = (90 + lng) * (Math.PI / 180);
  const phi = (90 - lat) * (Math.PI / 180);
  return new THREE.Vector3().setFromSpherical(
    new THREE.Spherical(2, phi, theta)
  );
}

// 获取两个点的中心
export const getVCenter = (v1: THREE.Vector3, v2: THREE.Vector3) => {
  const v = v1.add(v2);
  return v.divideScalar(2);
}
// 计算V1，V2向量固定长度的点
export const getLenVcetor = (v1: any, v2: any, len: any) => {
  const v1v2Len = v1.distanceTo(v2)
  return v1.lerp(v2, len / v1v2Len)
}
// 获取贝塞尔控制点
export const getBezierPoint = (v0: THREE.Vector3, v3: THREE.Vector3) => {
  // 夹角
  // 两点距离越远，弧线约大，vtop越高
  const angle = (v0.angleTo(v3) * 0.9) / Math.PI / 0.1; // 0 ~ Math.PI
  const aLen = angle * 0.3
  const hLen = angle * angle * 12;
  const p0 = new THREE.Vector3(0, 0, 0);
  const temp = new THREE.Vector3(0, 0, 0);
  // 法线向量
  const rayLine = new THREE.Ray(p0.clone(), getVCenter(v0.clone(), v3.clone()))
  // 顶点坐标
  const vtop = rayLine.at(hLen / rayLine.at(1, temp).distanceTo(p0), temp);
  // 控制点坐标
  const v1 = getLenVcetor(v0.clone(), vtop, aLen)
  const v2 = getLenVcetor(v3.clone(), vtop, aLen)
  return [v1, v2]
}