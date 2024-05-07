'use client'

import Image from 'next/image'

export default function Home() {
  return (
    <div className='flex justify-center'>
      <div className='max-w-[1200px]'>
        <Image src='/05.jpg' alt='main' width={1200} height={615} />
      </div>
    </div>
  )
}
