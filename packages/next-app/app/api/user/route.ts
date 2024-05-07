import prisma from '@/prisma/client'

export async function GET(request: Request) {
  // const user = await prisma.user.findMany()
  // console.log('user', user)
  return Response.json({ data: [] })
}
