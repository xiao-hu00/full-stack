import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useThemeStore } from '@/store/theme-store'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

// 表单校验
const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(8, {
    message: 'Username must be at least 8 characters.',
  }),
})

const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const myConfig = useThemeStore(state => state.config)
  // 初始化主题
  useEffect(() => {
    document.body.classList.forEach(className => {
      if (className.match(/^theme.*/)) {
        document.body.classList.remove(className)
      }
    })
    if (myConfig) {
      document.body.classList.add(`theme-${myConfig.theme}`)
      document.body.style.setProperty('--radius', `${myConfig.radius}rem`)
    }
  }, [])

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    setLoading(true)
    setTimeout(() => {
      localStorage.setItem('token', '123123')
      const url = decodeURIComponent(params.get('redirect') || '/home')
      navigate(url)
      setLoading(false)
    }, 1500)
  }

  return (
    <div className='flex justify-center'>
      <div className='w-[300px] mt-10'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='input username' {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='input password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' disabled={loading} className='w-[100%]'>
              <Loader2
                className={cn('mr-2 h-4 w-4', {
                  'animate-spin': loading,
                  hidden: !loading,
                })}
              />
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Login
