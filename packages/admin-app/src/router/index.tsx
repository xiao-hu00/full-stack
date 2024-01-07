import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from '@/pages/home'
import Layout from '@/pages/layout'
import Setting from '@/pages/user/setting'
import Role from '@/pages/user/role'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <React.Suspense fallback={<>加载中</>}>
          <Home />
        </React.Suspense>
      },
      {
        path: "/user/setting",
        element: <React.Suspense fallback={<>加载中</>}>
          <Setting />
        </React.Suspense>
      },
      {
        path: "/user/role",
        element: <React.Suspense fallback={<>加载中</>}>
          <Role />
        </React.Suspense>
      },
    ],
    errorElement: <>错误页面</>,
  },
])

export default router
