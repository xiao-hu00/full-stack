import { useState, useRef } from 'react'
import { getData } from '@/api/testApi'
import { DataTable } from '@/components'
import { useRequest } from 'ahooks'
import { Button } from '@/components/ui/button'

const columns = [
  {
    id: 'select',
    header: 'select',
    accessorKey: 'select',
    size: 15,
    enableSorting: false,
    enableHiding: false,
  },
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
  totalAmount: '金额'
}

const TableList = () => {
  const [params, setParams] = useState({
    pageSize: 10,
    currentPage: 1,
    search: '',
    sort: [],
  })
  const tableRef = useRef<any>(null)
  const { data, loading } = useRequest(
    () => {
      console.log('fetch data')
      return getData(params)
    },
    {
      refreshDeps: [params],
    }
  )

  const getSelected = () => {
    const list = tableRef?.current?.getTableSelect()
    console.log(list)
  }

  const onChange = (params: any) => {
    const { pageIndex = 0, pageSize = 10, sort = [], search = '' } = params
    console.log({
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
        loading={loading}
        columns={columns}
        ref={tableRef}
        total={data?.total}
        onChange={onChange}
        tableHeaderList={tableHeaderList}
      />
    </>
  )
}

export default TableList
