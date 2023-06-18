import React from 'react'
import { Perf } from 'r3f-perf'

const Component: React.FC<any> = (props) => {
  const { visible } = props
  return (
    <>
      {visible ? <Perf position="top-left" /> : null}
    </>
  )
}

export default Component
