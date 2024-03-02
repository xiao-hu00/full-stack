import type { Metadata } from 'next'
import prisma from '../../prisma/client'
import dayjs from 'dayjs'
import { User } from '@prisma/client'

export const metadata: Metadata = {
  title: 'App Document',
  description: 'The Document of this app',
}

export default async function Doc() {
  let data: User[] = []
  try {
    data = await prisma.user.findMany()
  } catch (e) {
    data = []
  }
  return (
    <div>
      User List
      <div>{data.length === 0 ? '暂无数据' : ''}</div>
      <div>
        {data.map(item => (
          <>
            <div>id: {item.id}</div>
            <div>name: {item.name}</div>
            <div>email: {item.email}</div>
            <div>createdAt: {dayjs(item.createdAt).format('YYYY-MM-DD')}</div>
          </>
        ))}
      </div>
    </div>
  )
}
