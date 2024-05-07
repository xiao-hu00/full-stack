import { signIn } from '@/auth'

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
