import { useEffect, useState, useMemo } from 'react'
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
  PaginationState,
  ColumnDef,
  getSortedRowModel,
  SortingState,
  flexRender,
} from '@tanstack/react-table'
import { DataTablePagination } from './pagination'
import { Task } from './schema'
import { Spin } from '@/components'
interface DataTableProps {
  columns: ColumnDef<Task>[]
  data?: Task[]
  loading?: boolean
  onChange?: Function
  total?: number
}

const DataTable = (props: DataTableProps) => {
  const { data, columns, loading = false, onChange, total } = props
  const [rowSelection, setRowSelection] = useState({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )
  useEffect(() => {
    onChange && onChange({ pageIndex, pageSize })
  }, [pageIndex, pageSize])
  const table = useReactTable({
    data: data || [],
    columns: columns,
    pageCount: Math.ceil((total || 0) / pageSize),
    state: {
      sorting,
      rowSelection,
      pagination,
    },
    manualPagination: true,
    enableRowSelection: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    // getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
  })
  return (
    <>
      <Spin loading={loading}>
        <Table className='border'>
          <TableHeader>
            {table?.getHeaderGroups()?.map(item => (
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
            {table?.getRowModel()?.rows?.length ? (
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
                  暂无数据
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className='mt-4'>
          <DataTablePagination table={table} />
        </div>
      </Spin>
    </>
  )
}

export default DataTable
