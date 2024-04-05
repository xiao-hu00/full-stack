---
outline: deep
---

# 类型安全

## typescript和zod

`typescript`只能在开发的时候进行静态类型推断和校验，编译之后就会丢失，使用`zod`可以在编译后代码里面正常运行校验。

`zod`主要用在`api`返回数据和`form`表单校验的类型校验，或者其他外部数据源，比如`url`上面的参数，浏览器的缓存等等

开发中函数的调用直接使用`typescript`校验类型即可

```ts
import {z} from 'zod' 
const input = {
  name: 'zhangsan',
  age: 18
}

const inputSchema = z.object({
  name: z.string(),
  age: z.number().min(1, "最小值为1")
})

const parseInput = (in: unknow) => {
  return inputSchema.parse(in)
}

const parse = parseInput(input)
const safeParse = parseInput(input) // safeParse.success = ture 为校验通过
```

上述代码中，尽管不知道`in`的输入类型，但是可以通过`zod`，得到`parse`的类型。

如果传入错误的类型，还可以给出错误提示，比如`age=0`时，会得到`inputSchema`给出的错误信息`"最小值为1"`。

`zod`可以直接返回一个正确的类型，而有不符合设置的时候直接抛出错误，但是`ts`则做不到运行中的类型检查。

