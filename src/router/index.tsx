import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Loading from '@/components/Loading'
import Home from '@/pages/home'
import Layout from '@/pages/layout'
import Map from '@/pages/map'
import Glb from '@/pages/glb'
import Animate from '@/pages/animate'
import Collect from '@/pages/collect'
import About from '@/pages/about'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <React.Suspense fallback={<Loading />}>
          <Home />
        </React.Suspense>
      },
      {
        path: "/map",
        element: <React.Suspense fallback={<Loading />}>
          <Map />
        </React.Suspense>
      },
      {
        path: "/glb",
        element: <Glb />
      },
      {
        path: "/collect",
        element: <Collect />
      },
      {
        path: "/animate",
        element: <Animate />
      },
      {
        path: "/about",
        element: <React.Suspense fallback={<Loading />}>
          <About />
        </React.Suspense>
      },
    ],
    errorElement: <>错误页面</>,
  },
])

export default router
