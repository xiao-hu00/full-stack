# Prisma

## 安装和使用步骤

安装项目依赖
- `pnpm add prisma -D`

安装插件
- Vs Code 搜索插件`prisma`

在项目中初始化 Prisma
- `pnpm dlx prisma init`

设置环境变量
- 创建`.env`文件，设置`DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/pg-sql?schema=public"`

对数据进行建模，在生成的`prisma/schema.prisma`文件中，添加如下代码
```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String   @unique
  desc      String?
  authorId  Int
  author    User?    @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model User {
  id        Int      @id @default(autoincrement())
  avatar    String?
  name      String
  email     String?
  post      Post[]
  createdAt DateTime @default(now())
}

```

迁移数据库
- `pnpm dlx prisma migrate dev --name "init"`，对应的数据模型会在数据库中建立相应的表

给数据库加一些数据

`prisma/seed.ts`
```ts
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

```

运行seed文件

`pnpm dlx ts-node ./prisma/seed.ts`，也可以全局安装ts-node依赖，`pnpm add ts-node -g`

如果全局安装了`ts-node`，可以在`package.json`文件里添加命令
```json
"scripts": {
    // ....
    "seed": "ts-node ./prisma/seed.ts"
  },
```
这样直接运行`pnpm run seed`即可执行`seed`命令


