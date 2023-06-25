import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Loading from '@/components/Loading'
import Home from '@/pages/home'
import Layout from '@/pages/layout'
import Map from '@/pages/map'
import Glb from '@/pages/glb'
import Animate from '@/pages/animate'

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
        path: "/animate",
        element: <Animate />
      }
    ],
    errorElement: <>错误页面</>,
  },
])

export default router
