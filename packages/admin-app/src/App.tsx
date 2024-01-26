import './App.css'
import { ThemeProvider } from "@/components/theme-provider"
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

// 创建一个 client
const queryClient = new QueryClient();

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
