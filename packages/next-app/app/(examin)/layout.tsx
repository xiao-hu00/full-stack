import Link from 'next/link'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <ul className='flex space-x-4 p-3'>
        <li>
          <Link href='/list' className='hover:text-orange-200'>
            考题
          </Link>
        </li>
        <li>
          <Link href='/test' className='hover:text-orange-200'>
            自测
          </Link>
        </li>
      </ul>
      <div>{children}</div>
    </>
  )
}
