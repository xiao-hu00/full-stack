import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      name: 'zhangsan',
      email: '11122@prisma.com',
      post: {
        create: { title: 'Hello World', desc: 'This is a init infomation!' },
      },
    },
  })

  const allUsers = await prisma.user.findMany()
  console.dir(allUsers, { depth: null })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    // 关闭 Prisma Client
    await prisma.$disconnect()
  })
