'use client'
import { useSpring, animated } from '@react-spring/web'

export default function Home() {
  const [props, api] = useSpring(() => ({ x: 0, y: 0 }))

  const click = () => {
    api.start({ x: 100, y: 120 })
  }

  return <animated.div style={props} onClick={click}>Hello, React Spring!</animated.div>
}
