import React from 'react'
import { createBrowserRouter, useLocation, Navigate } from 'react-router-dom'
import Layout from '@/pages/layout'
import Login from '@/pages/login'
import { routerList } from './router-list'
import { useMount, useUnmount, useInterval } from 'ahooks'
import { useMenuStore } from '@/store'

function RequireAuth({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('token')
  const { pathname } = useLocation()

  if (!token) {
    const url = encodeURIComponent(pathname)
    return <Navigate to={`/login?redirect=${url}`} replace />
  }

  return children
}

const Fallback = () => {
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
    id: 'root',
    element: <Layout />,
    children: routerList.map(item => {
      if (item.component) {
        return {
          path: item.path,
          index: item.path === '/home',
          element: (
            <RequireAuth>
              <React.Suspense fallback={<Fallback />}>
                <item.component />
              </React.Suspense>
            </RequireAuth>
          ),
        }
      } else {
        return {}
      }
    }),
    errorElement: <Navigate to='/home' />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default router
