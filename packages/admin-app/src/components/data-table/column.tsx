import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { TableColumnHeader } from './table-column-header'
import { ColumnsType } from './data'

export function tableColumn(colArray: ColumnsType[], rowSelect?: boolean) {
  const columns  = colArray.map((item) => {
    const obj: ColumnDef<any> = {
      id: item.id,
      accessorKey: item.accessorKey,
      header: item.header,
      size: item.size,
      enableSorting: item.enableSorting,
      enableHiding: item.enableHiding,
    }
    if (item.sort && typeof item.header === 'string') {
      obj.header = ({ column, table }) => (
        <TableColumnHeader column={column} tableObj={table} title={item.header.toString()} />
      ),
      obj.cell = ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>
    }
    if (item.cell) {
      obj.cell = item.cell
    }
    return obj
  })
  const selectColumn: ColumnDef<any> = {
    id: '__select',
    header: '__select',
    accessorKey: '__select',
    size: 15,
    enableSorting: false,
    enableHiding: false,
  }
  // checkbox 选择
  if (rowSelect) {
    selectColumn.header = ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    )
    selectColumn.cell = ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    )
    columns.unshift(selectColumn)
  }
  return columns
}
