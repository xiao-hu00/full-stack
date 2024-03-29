import { useState, useRef } from 'react'
import { getData } from '@/api/test-api'
import { DataTable, Breadcrumb } from '@/components'
import { Button } from '@/components/ui/button'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

const columns = [
  {
    id: 'id',
    accessorKey: 'id',
    header: '编号',
    sort: true,
  },
  {
    id: 'payment',
    header: '状态',
    accessorKey: 'paymentStatus',
    enableSorting: false,
    size: 50,
  },
  {
    id: 'method',
    header: '方法',
    accessorKey: 'paymentMethod',
  },
  {
    id: 'totalAmount',
    header: () => <div className='text-right'>金额</div>,
    accessorKey: 'totalAmount',
    cell: ({ row }: any) => (
      <div className='text-right'>{row.getValue('totalAmount')}</div>
    ),
  },
]
// react-table不支持id为中文，所以映射一下
// 列表抬头 显示或者隐藏 {id: '显示文字'}
const tableHeaderList: any = {
  id: '编号',
  payment: '状态',
  method: '方法',
  totalAmount: '金额',
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
      <Breadcrumb
        items={[
          { key: '1', label: '首页' },
          { key: '2', label: '数据列表' },
        ]}
      />
      <div className='mb-4'>数据表格</div>
      <Button onClick={getSelected}>console selected</Button>
      <DataTable
        data={data?.data}
        loading={isFetching}
        columns={columns}
        ref={tableRef}
        total={data?.total}
        onChange={onChange}
        tableHeaderList={tableHeaderList}
        rowSelect={true}
      />
    </>
  )
}

export default TableList
