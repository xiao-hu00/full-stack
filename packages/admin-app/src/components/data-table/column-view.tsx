'use client'

import { Table } from '@tanstack/react-table'
import { Button } from '../ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
  tableHeaderList: any
}

export function ColumnView<TData>({
  table,
  tableHeaderList,
}: DataTableViewOptionsProps<TData>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>设置列</Button>
      </PopoverTrigger>
      <PopoverContent className='p-4 w-32' align='end'>
        {table
          .getAllColumns()
          .filter(
            column =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide()
          )
          .map(column => {
            return (
              <div key={column.id} className='flex justify-center space-x-4 h-6 items-center'>
                <Checkbox
                  id={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={value => column.toggleVisibility(!!value)}
                />
                <Label htmlFor={column.id} className=' hover:text-orange-500'>
                  {tableHeaderList[column.id] || column.id}
                </Label>
              </div>
            )
          })}
      </PopoverContent>
    </Popover>
  )
}
