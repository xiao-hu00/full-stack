import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './tableHeader'
import { ColumnsType } from './data'

export function tableColumn(colArray: ColumnsType[]) {
  const columns  = colArray.map((item) => {
    const obj: ColumnDef<any> = {
      id: item.id,
      accessorKey: item.accessorKey,
      header: item.header,
      size: item.size
    }
    // checkbox 选择
    if (item.id === 'select') {
      obj.header = ({ table }) => (
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
      obj.cell = ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label='Select row'
          className='translate-y-[2px]'
        />
      )
    }
    if (item.id !== 'select' && item.sort) {
      obj.header = ({ column }) => (
        <DataTableColumnHeader column={column} title='Invoice' />
      ),
      obj.cell = ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>
    }
    if (item.cell) {
      obj.cell = item.cell
    }
    return obj
  })
  return columns
}
