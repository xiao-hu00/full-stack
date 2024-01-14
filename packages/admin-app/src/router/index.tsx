import React from 'react'
import { createBrowserRouter, useLocation, Navigate } from 'react-router-dom'
import Layout from '@/pages/layout'
import Login from '@/pages/login'
import { routerList } from './routerList'

function RequireAuth({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('token')
  let location = useLocation()

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: routerList.map((item) => {
      if (item.component) {
        return {
          path: item.path,
          index: item.path === '/home',
          element:
            <RequireAuth>
              <React.Suspense fallback={<>加载中</>}>
                <item.component />
              </React.Suspense>
            </RequireAuth>
        }
      } else {
        return {}
      }
    }),
    errorElement: <>错误页面</>,
  },
  {
    path: '/login',
    element: <Login />
  }
])

export default router
