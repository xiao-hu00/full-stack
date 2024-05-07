import { SINGLE_CHOICE, MULTIPLE_CHOICE, JUDGE } from '@/examin/db'
const ABC_ARRAY = ['A', 'B', 'C', 'D', 'E']
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default async function List() {
  return (
    <div className='max-w-[700px] p-4'>
      <Tabs defaultValue='single'>
        <TabsList className='sticky top-0 w-full'>
          <TabsTrigger value='single' className='w-[30%]'>
            单选
          </TabsTrigger>
          <TabsTrigger value='multiple' className='w-[30%]'>
            多选
          </TabsTrigger>
          <TabsTrigger value='judge' className='w-[30%]'>
            判断
          </TabsTrigger>
        </TabsList>
        <TabsContent value='single'>
          {SINGLE_CHOICE.map((item, index) => (
            <div key={item.id} className='mb-8'>
              <div className='text-gray-400 text-xs'>id:{item.id}</div>
              <div>
                {index + 1}.{item.question}
              </div>
              {item.options.map((m, i) => (
                <div key={i} className='text-gray-500 text-sm'>
                  {ABC_ARRAY[i]}
                  <span className='pl-2'>{m}</span>
                </div>
              ))}
              <div className='text-gray-400 text-sm'>
                参考答案：{ABC_ARRAY[Number(item.answer) - 1] || '暂无'}
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value='multiple'>
          {MULTIPLE_CHOICE.map((item, index) => (
            <div key={item.id} className='mb-8'>
              <div className='text-gray-400 text-xs'>id:{item.id}</div>
              <div>
                {index + 1}.{item.question}
              </div>
              {item.options.map((m, i) => (
                <div key={i} className='text-gray-500 text-sm'>
                  {ABC_ARRAY[i]}
                  <span className='pl-2'>{m}</span>
                </div>
              ))}
              <div className='text-gray-400 text-sm'>
                参考答案：
                {item.answer.map(m => (
                  <span key={m} className='pr-2'>
                    {ABC_ARRAY[Number(m) - 1]}
                  </span>
                ))}
                {item.answer.length === 0 && '暂无'}
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value='judge'>
          {JUDGE.map((item, index) => (
            <div key={item.id}>
              <div className='text-gray-400 text-xs'>id:{item.id}</div>
              <div>
                {index + 1}.{item.question}
              </div>
              <div className='text-gray-400 text-sm mb-8'>
                {item.answer === 'true' ? '正确' : '错误'}
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
