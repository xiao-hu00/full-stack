
import { auth, signIn, signOut } from '@/auth'
import { SessionProvider } from "next-auth/react"

export function SignIn({
  provider,
  ...props
}: any) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn(provider)
      }}
    >
      <button>Sign In</button>
    </form>
  )
}

export function SignOut(props: any) {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
      className="w-full"
    >
      <button className="w-full p-0">
        Sign Out
      </button>
    </form>
  )
}

export default async function Login() {
  const session = await auth()
  const email = session?.user?.email
  return (
    <>
      <div>login</div>
      <div>{email ? <SignOut/> : <SignIn />}</div>
      <SessionProvider basePath={'/auth'} session={session}>
        <div>登录信息：{JSON.stringify(session)}</div>
      </SessionProvider>
    </>
  )
}
