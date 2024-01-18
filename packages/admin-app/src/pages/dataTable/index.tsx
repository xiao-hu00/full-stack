import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
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

const invoices = [
  {
    id: '1',
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    id: '2',
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    id: '3',
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: '4',
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    id: '5',
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    id: '6',
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: '7',
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
]
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
  },
  {
    id: 'invoice',
    accessorKey: 'invoice',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Invoice' />
    ),
    cell: ({ row }) => (
      <div className='w-[80px]'>{row.getValue('invoice')}</div>
    ),
  },
  {
    id: 'paymentStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
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
    cell: ({ row }) => (
      <div className='text-right'>{row.getValue('totalAmount')}</div>
    ),
  },
]
const DataTable = () => {
  const [rowSelection, setRowSelection] = React.useState({})
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data: invoices,
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
                >
                  {flexRender(m.column.columnDef.header, m.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
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
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className='text-right'>$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className='mt-4'>
        <DataTablePagination table={table} />
      </div>
    </>
  )
}

export default DataTable
