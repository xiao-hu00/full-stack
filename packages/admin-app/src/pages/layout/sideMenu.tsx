import { animated, useSpring } from '@react-spring/web'

const SideMenu = () => {
  const [hStyle, api] = useSpring(
    () => ({
      from: { height: 0 },
      to: { height: 100 },
    }),
    []
  )
  const clickMenu = () => {
    
  }
  return (
    <div className="p-3 dark:bg-slate-900 h-[100vh] overflow-y-auto">
      <div>
        <div onClick={clickMenu} className="w-[100%] py-2 pl-2 rounded cursor-pointer dark:hover:bg-slate-700 hover:bg-gray-100 mb-2">111</div>
        <animated.div style={hStyle}>
          <div className="w-[100%] py-2 pl-4 rounded cursor-pointer dark:hover:bg-slate-700 hover:bg-gray-100 mb-2">111-111</div>
          <div className="w-[100%] py-2 pl-4 rounded cursor-pointer dark:hover:bg-slate-700 hover:bg-gray-100 mb-2">111-222</div>
        </animated.div>
      </div>
      <div>
        <div>222</div>
        <div>222-111</div>
        <div>222-222</div>
      </div>
      <div>333</div>
    </div>
  )
}

export default SideMenu