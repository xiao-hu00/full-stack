'use client'

import Image from 'next/image'

export default function Home() {
  return (
    <div className='flex justify-center'>
      <div className='max-w-[1200px]'>
        <Image src='/05.jpg' alt='main' width={1200} height={615} />
        <h1 className='text-center font-bold mt-20 mb-20 text-4xl'>成员介绍</h1>
        <div className='flex gap-10'>
          <Image src='/08.jpg' alt='08' width={400} height={500} />
          <div>姓名：</div>
        </div>
        <div className='flex gap-10'>
          <Image src='/01.jpg' alt='01' width={400} height={500} />
          <div>姓名：</div>
        </div>
        <div className='flex gap-10'>
          <Image src='/02.jpg' alt='02' width={400} height={500} />
          <div>姓名：</div>
        </div>
        <div className='flex gap-10'>
          <Image src='/07.jpg' alt='07' width={400} height={500} />
          <div>姓名：</div>
        </div>
        <h1 className='text-center font-bold mt-20 mb-20 text-4xl'>联系我们</h1>
      </div>
    </div>
  )
}
