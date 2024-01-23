import {
  useState,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react'
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
  getSortedRowModel,
  SortingState,
  flexRender,
} from '@tanstack/react-table'
import { DataTablePagination } from './pagination'
import { DataTableProps } from './data'
import { Spin } from '@/components'
import { tableColumn } from './column'
import { Input } from '../ui/input'
import { useDebounce } from 'ahooks'

const DataTable = forwardRef((props: DataTableProps, ref) => {
  const { data, columns, loading = false, total, onChange } = props
  const [rowSelection, setRowSelection] = useState({})
  const [value, setValue] = useState<string>('')
  const [changeValues, setChangeValue] = useState<object>({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const debouncedValue = useDebounce(value, { wait: 500 })
  const myCol = useMemo(() => {
    return tableColumn(columns)
  }, [columns])
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )
  const getTableSelect = () => {
    return table.getSelectedRowModel().rows.map((item) => item.original)
  }
  useImperativeHandle(ref, () => {
    return {
      getTableSelect
    }
  })
  useEffect(() => {
    onChange && onChange({ ...changeValues, pageIndex, pageSize })
    setChangeValue({ ...changeValues, pageIndex, pageSize })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize])
  useEffect(() => {
    onChange && onChange(changeValues)
  }, [debouncedValue])
  const table = useReactTable({
    data: data || [],
    columns: myCol,
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
  const onChangeSearch = (e) => {
    const v = e.target.value
    setValue(v)
    setChangeValue({ ...changeValues, search: v })
  }
  return (
    <>
      <div className='mt-4 mb-4'>
        <Input className='w-56'  value={value} onChange={e => onChangeSearch(e)} />
      </div>
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
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
})

export default DataTable
