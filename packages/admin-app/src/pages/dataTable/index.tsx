import { useState, useRef } from 'react'
import { getData } from '@/api/testApi'
import { DataTable } from '@/components'
import { useRequest, useMount } from 'ahooks'
import { Button } from '@/components/ui/button'

const columns = [
  {
    id: 'select',
    header: 'select',
    accessorKey: 'select',
    size: 15,
  },
  {
    id: 'id',
    accessorKey: 'id',
    header: 'id',
    sort: true,
  },
  {
    id: 'paymentStatus',
    header: 'PaymentStatus',
    accessorKey: 'paymentStatus',
  },
  {
    id: 'paymentMethod',
    header: 'Method',
    accessorKey: 'paymentMethod',
  },
  {
    id: 'totalAmount',
    header: 'Amount',
    accessorKey: 'totalAmount',
    cell: ({ row }) => <div className='text-right'>{row.getValue('totalAmount')}</div>
  },
]

const TableList = () => {
  const [{ pageSize, currentPage }, setPage] = useState({
    pageSize: 10,
    currentPage: 1,
  })
  const tableRef = useRef<any>(null)
  const { data, run, loading } = useRequest(
    () => getData({ pageSize, currentPage }),
    {
      refreshDeps: [pageSize, currentPage],
    }
  )

  useMount(() => {
    run()
  })

  const getSelected = () => {
    const list: any = tableRef?.current?.getTableSelect()
    console.log(list)
  }

  const onChange = params => {
    console.log(params)
    const { pageIndex = 0, pageSize = 10 } = params
    setPage({
      pageSize,
      currentPage: pageIndex + 1,
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
      />
    </>
  )
}

export default TableList
