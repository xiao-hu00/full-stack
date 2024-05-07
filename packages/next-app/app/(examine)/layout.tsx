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
            questions
          </Link>
        </li>
        <li>
          <Link scroll={false} href='/test' className='hover:text-orange-200'>
            examine
          </Link>
        </li>
      </ul>
      <div>{children}</div>
    </>
  )
}
