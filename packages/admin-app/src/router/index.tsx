import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/pages/layout'

import { routerList } from './routerList'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: routerList.map((item) => {
      if (item.component) {
        return {
          path: item.path,
          index: item.path === '/home',
          element: <React.Suspense fallback={<>加载中</>}>
            <item.component />
          </React.Suspense>
        }
      } else {
        return {}
      }
    }),
    errorElement: <>错误页面</>,
  },
])

export default router
