import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
const SortItem = (props: any) => {
  const { id, data } = props
  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    isSorting,
  } = useSortable({ id })
  const myStyle =
    isDragging || isSorting
      ? {
          transform: CSS.Transform.toString(transform),
          transition,
        }
      : undefined

  return (
    <div style={{ cursor: 'move', ...myStyle }} {...listeners} {...attributes}>
      <div style={{ border: '1px solid #DDD', marginBottom: 25 }}>
        drag: {data}
      </div>
    </div>
  )
}

export default SortItem
