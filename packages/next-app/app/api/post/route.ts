import prisma from '@/prisma/client'

export async function GET(request: Request) {
  // const post = await prisma.post.findMany()
  // console.log('post', post)
  return Response.json({ data: [] })
}
