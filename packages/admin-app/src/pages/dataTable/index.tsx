import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  ColumnDef,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table'
import { DataTablePagination } from './pagination'
import { Checkbox } from '@/components/ui/checkbox'
import { Task } from './schema'
import { DataTableColumnHeader } from './tableHeader'
import { getData } from '@/api/testApi'
import { Spin } from '@/components'

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

const DataTable = () => {
  const [rowSelection, setRowSelection] = useState({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [data, setData] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getData().then(res => {
      setData(res)
      setLoading(false)
    })
  }, [])

  const table = useReactTable({
    data: data,
    columns: columns,
    state: {
      sorting,
      rowSelection,
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })
  return (
    <>
      <div className='mb-4'>数据表格</div>
      <Table className='border'>
        <TableHeader>
          {table.getHeaderGroups().map(item => (
            <TableRow key={item.id}>
              {item.headers.map((m, index) => (
                <TableHead
                  key={m.id}
                  className={cn({
                    'text-right': index + 1 === item.headers.length,
                  })}
                  style={{
                    width: m.column.getSize(),
                  }}
                >
                  {flexRender(m.column.columnDef.header, m.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <div className='h-24 flex items-center justify-center w-[100%]'>
                  <Spin loading={loading} />
                </div>
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className='h-10'
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className='mt-4'>
        <DataTablePagination table={table} />
      </div>
    </>
  )
}

export default DataTable
