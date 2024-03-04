import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const SortableItem = (props: any) => {
  const { id } = props
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
  return (
    <div
      ref={setNodeRef}
      style={{ cursor: 'move', ...myStyle, gridColumn: id === 3 ? '1 / span 2' : '' }}
      {...listeners}
      {...attributes}
    >
      <div style={{ border: '1px solid #DDD', marginBottom: 25, height: id === 3 ? 90 : 25 }}>
        drag: {id}
      </div>
    </div>
  )
}

export default SortableItem
