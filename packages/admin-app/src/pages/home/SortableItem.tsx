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
  const style = {
    opacity: isDragging ? 0.5 : 1
  }
  return (
    <div
      ref={setNodeRef}
      style={{ cursor: 'move', ...myStyle }}
      {...listeners}
      {...attributes}
    >
      <div className='bg-white border border-gray-300 mb-4' style={{ ...style, height: id === 3 ? 90 : 25 }}>
        drag: {id}
      </div>
    </div>
  )
}

export default SortableItem
