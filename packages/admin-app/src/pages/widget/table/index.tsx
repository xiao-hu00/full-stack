import { useState, useRef } from 'react'
import { getData } from '@/api/test-api'
import { DataTable } from '@/components'
import { Button } from '@/components/ui/button'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

const columns = [
  {
    id: 'id',
    accessorKey: 'id',
    header: '编号',
    sort: true,
    size: 50,
  },
  {
    id: 'title',
    header: '标题',
    accessorKey: 'title',
  },
  {
    id: 'priority',
    header: '分类',
    accessorKey: 'priority',
    enableSorting: false,
    size: 50,
  },
  {
    id: 'status',
    header: '状态',
    accessorKey: 'status',
  },
  {
    id: 'label',
    header: () => <div className='text-center'>标签</div>,
    accessorKey: 'label',
    cell: ({ row }: any) => (
      <div className='text-center'>{row.getValue('label')}</div>
    ),
  },
]
// react-table不支持id为中文，所以映射一下
// 列表抬头 显示或者隐藏 {id: '显示文字'}
const tableHeaderList: any = {
  id: '编号',
  priority: '分类',
  status: '状态',
  title: '标题',
  label: '标签',
}

const TableList = () => {
  const [params, setParams] = useState({
    pageSize: 10,
    currentPage: 1,
    search: '',
    sort: [],
  })
  const tableRef = useRef<any>(null)
  // 查询 key: 文件夹名称+函数名
  const { data, isFetching } = useQuery({
    queryKey: ['data-list-getData', params],
    queryFn: () => getData(params),
    placeholderData: keepPreviousData,
  })

  const getSelected = () => {
    const list = tableRef?.current?.getTableSelect()
    console.log(list)
  }
  const onChange = (params: any) => {
    const { pageIndex = 0, pageSize = 10, sort = [], search = '' } = params
    console.log('onChange', {
      pageSize,
      currentPage: pageIndex + 1,
      sort,
      search,
    })
    setParams({
      pageSize,
      currentPage: pageIndex + 1,
      sort,
      search,
    })
  }

  return (
    <>
      <div className='mb-4'>数据表格</div>
      <Button onClick={getSelected}>console selected</Button>
      <DataTable
        data={data?.data}
        loading={isFetching}
        columns={columns}
        ref={tableRef}
        total={data?.items}
        onChange={onChange}
        tableHeaderList={tableHeaderList}
        rowSelect={true}
      />
    </>
  )
}

export default TableList
