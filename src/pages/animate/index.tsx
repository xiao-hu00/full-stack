import React, { useEffect, useRef } from 'react'
import { useSpring, animated, useScroll, useSpringValue } from '@react-spring/web'
import { useScroll as useScrollHooks } from 'ahooks'

const Page: React.FC = () => {
  const { scrollY } = useScroll()
  const ref = useRef<any>(null!)
  const scroll = useScrollHooks(document) as {
    top: number
    left: number
  }
  const fontSize = useSpringValue(12)
  if (scroll?.top > 200) {
    fontSize.start(20)
  } else {
    fontSize.start(12)
  }
  const list = Array.from({ length: 100 }, (_, i) => 1 + (i))
  const styles = useSpring({
    from: {
      opacity: 0,
      x: 0,
      y: 15,
    },
    to: {
      opacity: 1,
      x: 120,
      y: 120,
    },
    config: {
      duration: 2000
    }
  })
  return (
    <>
      <animated.div
        style={{
          position: 'absolute',
          ...styles
        }}
      >
        test animate
      </animated.div>
      <animated.div style={{ position: 'absolute', left: 200, top: scrollY, fontSize }}>
        Hello World
      </animated.div>
      <div style={{ position: 'fixed', top: 0, left: 300 }}>{JSON.stringify(scroll)}</div>
      <div ref={ref}>
        {list.map((item) => (<div key={item}>item: {item}</div>))}
      </div>
    </>
  )
}

export default Page
