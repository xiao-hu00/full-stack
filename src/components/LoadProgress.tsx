import { Html, useProgress } from '@react-three/drei'

const Loader = () => {
  const { active, progress, errors, item, loaded, total } = useProgress()
  return <Html center><span style={{ color: '#FFF' }}>{progress} % loaded</span></Html>
}

export default Loader
