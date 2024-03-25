import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { Column } from '@tanstack/react-table'

interface SortableItemProps<TData> {
  tableHeaderList?: any
  id?: string
  column?: Column<TData, unknown>
}

export function SortableItem<TData>(props: SortableItemProps<TData>) {
  const { id = '-1', column, tableHeaderList } = props
  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    isSorting,
    setNodeRef,
  } = useSortable({ id })
  const myStyle =
    isDragging || isSorting
      ? {
          transform: CSS.Transform.toString(transform),
          transition,
        }
      : undefined
  const style = {
    opacity: isDragging ? 0.5 : 1,
  }
  return (
    <div
      ref={setNodeRef}
      style={{ cursor: 'move', ...myStyle, ...style }}
      {...listeners}
      {...attributes}
    >
      <div key={id} className='flex justify-center space-x-4 h-6 items-center'>
        <Checkbox
          id={id}
          checked={column?.getIsVisible()}
          onCheckedChange={(value) => column?.toggleVisibility(!!value)}
        />
        <Label htmlFor={id} className=' hover:text-orange-500'>
          {tableHeaderList[id] || id}
        </Label>
      </div>
    </div>
  )
}
