import './App.css'
import { ThemeProvider } from "@/components/theme-provider"
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import LoadingBar from 'react-top-loading-bar'
import { useMenuStore } from '@/store'

// 创建一个 client
const queryClient = new QueryClient();

function App() {
  const { progress } = useMenuStore()
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/* 顶部进度条 */}
        <LoadingBar progress={progress} color={`hsl(var(--primary))`} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
