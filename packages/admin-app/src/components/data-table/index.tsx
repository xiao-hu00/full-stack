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
import {
  useReactTable,
  getCoreRowModel,
  PaginationState,
  getSortedRowModel,
  SortingState,
  flexRender,
} from '@tanstack/react-table'
import { Pagination } from './pagination'
import { DataTableProps } from './data'
import { Spin } from '@/components'
import { tableColumn } from './column'
import { Input } from '../ui/input'
import { useDebounce } from 'ahooks'
import { ColumnView } from './column-view'

const DataTable = forwardRef((props: DataTableProps, ref) => {
  // todo <选择全部> 由于每一行都设置了id，所以<选择全部>必须知道所有的id，并设置为true -> rowSelection: {id: true, xxx: true}
  const {
    data,
    columns,
    loading = false,
    total = 0,
    onChange,
    tableHeaderList,
    rowSelect = false,
  } = props
  const [rowSelection, setRowSelection] = useState({})
  const [value, setValue] = useState<string>('')
  const [changeValues, setChangeValue] = useState<object>({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const debouncedValue = useDebounce(value, { wait: 500 })
  // 根据传入的columns生成table需要的columns
  const tableColumns = useMemo(() => {
    return tableColumn(columns, rowSelect)
  }, [columns])
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )
  // 获取选择的row
  const getTableSelect = () => {
    return Object.keys(rowSelection)
  }
  useImperativeHandle(ref, () => {
    return {
      getTableSelect,
    }
  })
  useEffect(() => {
    onChange?.({ ...changeValues, pageIndex, pageSize, sort: sorting })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, pageIndex, pageSize, sorting])
  // 排序
  // const onSortingChange = (fn: any) => {
  //   setSorting(fn)
  // }
  // 翻页
  // const onPaginationChange = (updater: any) => {
  //   const nextState = updater(pagination)
  //   setPagination(nextState)
  // }
  // 每一行都设置一个唯一id，在 select row 之后，翻页也不会影响到已选中的 row
  const getRowId = (originalRow: any) => originalRow.id.toString()

  const table = useReactTable({
    data: data || [],
    columns: tableColumns,
    pageCount: Math.ceil((total || 0) / pageSize),
    state: {
      sorting,
      rowSelection,
      pagination,
    },
    getRowId,
    manualPagination: true,
    manualSorting: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
  })
  // 搜索
  const onChangeSearch = (e: any) => {
    const v = e.target.value
    setValue(v)
    setChangeValue({ ...changeValues, search: v })
  }
  return (
    <>
      <div className='mt-4 mb-4 flex gap-4 justify-between'>
        <Input
          className='w-56'
          value={value}
          onChange={e => onChangeSearch(e)}
        />
        {tableHeaderList ? (
          <ColumnView table={table} tableHeaderList={tableHeaderList} />
        ) : null}
      </div>
      <Spin loading={loading}>
        <Table className='border'>
          <TableHeader>
            {table?.getHeaderGroups()?.map(item => (
              <TableRow key={item.id}>
                {item.headers.map(m => (
                  <TableHead
                    key={m.id}
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
          <Pagination table={table} total={total} />
        </div>
      </Spin>
    </>
  )
})

export default DataTable
