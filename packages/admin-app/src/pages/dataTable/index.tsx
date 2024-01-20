import { useEffect, useState } from 'react'
import {
  ColumnDef,
} from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Task } from './schema'
import { DataTableColumnHeader } from './tableHeader'
import { getData } from '@/api/testApi'
import { DataTable } from '@/components'
import { useRequest } from 'ahooks'

const columns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 15,
  },
  {
    id: 'id',
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Invoice' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
  },
  {
    id: 'paymentStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
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
    cell: ({ row }) => (
      <div className='text-right'>{row.getValue('totalAmount')}</div>
    ),
  },
]

const Table = () => {
  const [{ pageSize, currentPage }, setPage] = useState({
    pageSize: 10,
    currentPage: 1
  })

  const { data, run, loading } = useRequest(() => getData({pageSize, currentPage}), {
    refreshDeps: [pageSize, currentPage],
  })

  useEffect(() => {
    run()
  }, [])

  const onChange = (params: any) => {
    console.log(params)
    const { pageIndex, pageSize } = params
    setPage({
      pageSize,
      currentPage: pageIndex + 1
    })
  }
  
  return (
    <>
      <div className='mb-4'>数据表格</div>
      <DataTable data={data?.data} loading={loading} columns={columns} onChange={onChange} total={data?.total} />
    </>
  )
}

export default Table
