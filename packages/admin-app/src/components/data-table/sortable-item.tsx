import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

const SortableItem = (props: any) => {
  const { id, column, tableHeaderList } = props
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
      style={{ cursor: 'move', ...myStyle }}
      {...listeners}
      {...attributes}
    >
      <div
        key={column.id}
        className='flex justify-center space-x-4 h-6 items-center'
      >
        <Checkbox
          id={column.id}
          checked={column.getIsVisible()}
          onCheckedChange={(value: any) => column.toggleVisibility(!!value)}
        />
        <Label htmlFor={column.id} className=' hover:text-orange-500'>
          {tableHeaderList[column.id] || column.id}
        </Label>
        
      </div>
    </div>
  )
}

export default SortableItem
