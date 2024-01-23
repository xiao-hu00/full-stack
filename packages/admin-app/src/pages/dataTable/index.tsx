import { useState } from 'react'
import { Task } from './schema'
import { getData } from '@/api/testApi'
import { DataTable } from '@/components'
import { useRequest, useMount } from 'ahooks'

const columns: Task[] = [
  {
    id: 'select',
    header: 'select',
    accessorKey: 'select',
    sort: true,
    size: 15,
  },
  {
    id: 'id',
    accessorKey: 'id',
    header: 'id',
  },
  {
    id: 'paymentStatus',
    header: 'PaymentStatus',
    accessorKey: 'paymentStatus',
    size: 40,
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
  },
]

const Table = () => {
  const [{ pageSize, currentPage }, setPage] = useState({
    pageSize: 10,
    currentPage: 1,
  })

  const { data, run, loading } = useRequest(
    () => getData({ pageSize, currentPage }),
    {
      refreshDeps: [pageSize, currentPage],
    }
  )

  useMount(() => {
    run()
  })

  const onChange = params => {
    console.log(params)
    const { pageIndex, pageSize } = params
    setPage({
      pageSize,
      currentPage: pageIndex + 1,
    })
  }

  return (
    <>
      <div className='mb-4'>数据表格</div>
      <DataTable
        data={data?.data}
        loading={loading}
        columns={columns}
        onChange={onChange}
        total={data?.total}
      />
    </>
  )
}

export default Table
