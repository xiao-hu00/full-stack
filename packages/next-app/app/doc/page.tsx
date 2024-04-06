import type { Metadata } from 'next'
import dayjs from 'dayjs'
import { User } from '@prisma/client'
import { auth } from '@/auth'

export const metadata: Metadata = {
  title: 'App Document',
  description: 'The Document of this app',
}

async function getData() {
  console.log('getData')
  const res = await fetch('http://127.0.0.1:3000/api/user')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Doc() {
  const { data }: { data: User[] } = {data: []} // await getData()
  const session = await auth()
  console.log('123', session)

  return (
    <div>
      User List
      <div>{data.length === 0 ? '暂无数据' : ''}</div>
      <div>
        {data.map(item => (
          <div key={item.id}>
            <div>id: {item.id}</div>
            <div>name: {item.name}</div>
            <div>email: {item.email}</div>
            <div>createdAt: {dayjs(item.createdAt).format('YYYY-MM-DD')}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
