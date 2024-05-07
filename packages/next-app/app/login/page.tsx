import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'
import { SignIn } from './SignIn'
import { SignOut } from './SignOut'

export default async function Login() {
  const session = await auth()
  const email = session?.user?.email
  return (
    <div className='p-4'>
      <h1>LOGIN</h1>
      <span className='inline-block my-4 border border-gray-200 px-4 py-1 rounded-sm'>
        {email ? <SignOut /> : <SignIn />}
      </span>
      <SessionProvider basePath={'/auth'} session={session}>
        <div>登录信息：{JSON.stringify(session)}</div>
      </SessionProvider>
    </div>
  )
}
