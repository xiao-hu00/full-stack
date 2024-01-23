import React from 'react'
import { createBrowserRouter, useLocation, Navigate } from 'react-router-dom'
import Layout from '@/pages/layout'
import Login from '@/pages/login'
import { routerList } from './routerList'
import { useMount, useUnmount, useInterval } from 'ahooks'
import { useMenuStore } from '@/store'

function RequireAuth({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('token')
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children;
}

function FallBack() {
  const updateProgress = useMenuStore(state => state.updateProgress)
  useMount(() => {
    updateProgress(30)
  })
  let num = 30
  useInterval(() => {
    console.log('time interval')
    num = num + 10
    if (num === 90) return
    updateProgress(num)
  }, 1000)
  useUnmount(() => {
    updateProgress(101)
  })
  return null
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
              <React.Suspense fallback={<><FallBack /></>}>
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
