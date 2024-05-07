import { auth, signOut } from '@/auth'

export function SignOut(props: any) {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
      className='w-full'
    >
      <button className='w-full p-0'>Sign Out</button>
    </form>
  )
}
