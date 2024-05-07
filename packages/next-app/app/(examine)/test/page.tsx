'use client'
import { SINGLE_CHOICE, MULTIPLE_CHOICE, JUDGE } from '@/examin/db'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import CheckboxGroup from '@/components/CheckboxGroup'
import Link from 'next/link'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

const ABC_ARRAY = ['A', 'B', 'C', 'D', 'E']

function getRandomArray(arr: Array<any>, length: number) {
  const newArr = [] // 组成的新数组初始化
  const originArr = arr.slice()
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * originArr.length)
    const item = originArr[index]
    newArr.push(item)
    originArr.splice(index, 1)
  }
  return newArr.reverse()
}

export default function Test() {
  const [data, setData] = useState<any>({
    sList: [],
    mList: [],
    jList: [],
  })
  const initData = Array.from(new Array(50), (_, i) => ({ number: i + 1 }))
  const [checkData, setCheckData] = useState<any>(initData)
  const [isComplete, setIsComplete] = useState(false)
  const formRef = useRef<any>(null)
  useEffect(() => {
    const sList = getRandomArray(SINGLE_CHOICE, 20)
    const mList = getRandomArray(MULTIPLE_CHOICE, 10)
    const jList = getRandomArray(JUDGE, 20)
    setData({ sList, mList, jList })
  }, [])
  const form = useForm()

  const getQuestionById = (id: any) => {
    const nId = Number(id)
    const allQuestions = data.sList.concat(data.mList, data.jList)
    const obj = allQuestions.find((item: any) => item.id === nId)
    return obj
  }

  const isEqual = (a: any, b: any) => {
    if (typeof a === 'string') {
      const c = ABC_ARRAY[Number(a) - 1] || a
      return c === b
    } else if (Array.isArray(a) && Array.isArray(b)) {
      const c = a.map(m => ABC_ARRAY[Number(m) - 1])
      const d = new Set()
      c.concat(b).map(m => {
        d.add(m)
      })
      return c.length === b.length && a.length === d.size
    }
    return false
  }

  const onSubmit = (values: any) => {
    const result = []
    let tap = true
    for (const key in values) {
      if (!values[key] || values[key].length === 0) {
        tap = false
      }
      const arr = key.split('-')
      const question = getQuestionById(arr[0])
      result.push({
        id: arr[0],
        number: arr[1],
        selected: 'true',
        correct: isEqual(question?.answer, values[key]) ? 'true' : 'false',
      })
    }
    setIsComplete(tap)
    setCheckData(result)
  }

  const changeSelect = (index: number, value: any) => {
    const list = checkData.map((m: any) => {
      if (m.number === index && value) {
        return { ...m, selected: 'true' }
      } else if (m.number === index && !value) {
        return { ...m, selected: 'false' }
      }
      return m
    })
    setCheckData(list)
  }

  const createQuestions = (
    <>
      <div className='grid grid-cols-10 gap-3'>
        {checkData.map((item: any) => (
          <div
            key={item.number}
            className={cn(
              'text-center cursor-default rounded-full bg-white border border-gray-200',
              { 'bg-blue-400 text-white': item.selected === 'true' },
              { 'bg-green-400 text-white': item.correct === 'true' },
              { 'bg-red-400 text-white': item.correct === 'false' }
            )}
          >
            <Link href={`#s${item.number}`}>{item.number}</Link>
          </div>
        ))}
      </div>
    </>
  )

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant='outline' className='block sm:hidden'>
            查看答题信息
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className='mx-auto w-full max-w-sm px-4 py-8'>{createQuestions}</div>
        </DrawerContent>
      </Drawer>
      <div className='hidden md:block xl:block lg:block fixed left-[680px] top-0 p-4 w-[400px]'>
        {createQuestions}
      </div>
      <div className='max-w-[700px] p-4'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            ref={formRef}
            className='space-y-4'
          >
            {/* <div>单选20题</div> */}
            {data.sList.map((item: any, index: number) => (
              <div key={item.id} className='mb-8' id={'s' + (index + 1)}>
                <div className='text-gray-400 text-xs'>id:{item.id}</div>
                <div>
                  {index + 1}.{item.question}
                </div>
                <FormField
                  control={form.control}
                  name={item.id + '-' + (index + 1)}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={value => {
                            changeSelect(index + 1, value)
                            field.onChange(value)
                          }}
                          className='mt-2'
                          name={item.id + '-' + index}
                        >
                          {item.options.map((m: any, i: number) => (
                            <div
                              key={i}
                              className='flex items-center space-x-2'
                            >
                              <RadioGroupItem
                                value={ABC_ARRAY[i]}
                                id={item.id + '-' + (i + 1)}
                              />

                              <Label className='font-normal' htmlFor={item.id + '-' + (i + 1)}>
                                {ABC_ARRAY[i]}.{m}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            ))}
            {/* <div>多选10题</div> */}
            {data.mList.map((item: any, index: number) => (
              <div key={item.id} className='mb-4' id={'s' + (index + 21)}>
                <div className='text-gray-400 text-xs'>id:{item.id}</div>
                <div>
                  {index + 21}.{item.question}
                </div>
                <FormField
                  control={form.control}
                  name={item.id + '-' + (index + 21)}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CheckboxGroup
                          items={item}
                          onChange={(value: any) => {
                            changeSelect(index + 21, value)
                            field.onChange(value)
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            ))}
            {/* <div>判断20题</div> */}
            {data.jList.map((item: any, index: number) => (
              <div key={item.id} className='mb-8' id={'s' + (index + 31)}>
                <div className='text-gray-400 text-xs'>id:{item.id}</div>
                <div>
                  {index + 31}.{item.question}
                </div>
                <FormField
                  control={form.control}
                  name={item.id + '-' + (index + 31)}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={value => {
                            changeSelect(index + 31, value)
                            field.onChange(value)
                          }}
                        >
                          <div className='flex items-center space-x-2 mt-2'>
                            <RadioGroupItem value='true' id={item.id + '-1'} />
                            <Label className='font-normal' htmlFor={item.id + '-1'}>正确</Label>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='false' id={item.id + '-2'} />
                            <Label className='font-normal' htmlFor={item.id + '-2'}>错误</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <div className='h-16'></div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className={cn(
                    'w-[90%] fixed bottom-4 left-[5%] max-w-[400px]',
                    {
                      hidden:
                        data.jList.length === 0 ||
                        data.sList.length === 0 ||
                        data.mList.length === 0,
                    }
                  )}
                >
                  提交
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>提示</AlertDialogTitle>
                  <AlertDialogDescription>
                    {isComplete
                      ? '已全部完成，是否提交？'
                      : '还有未完成的题目，是否提交？'}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>取消</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      if (formRef.current) {
                        formRef.current.dispatchEvent(
                          new Event('submit', { bubbles: true })
                        )
                      }
                    }}
                  >
                    确认
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </form>
        </Form>
      </div>
    </>
  )
}
