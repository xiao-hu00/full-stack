import { Breadcrumb } from '@/components'
import { useState } from 'react'
import {
  closestCenter,
  DndContext,
  MouseSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import SortItem from './sortItem'

const Home = () => {
  const [items, setItems] = useState([1, 2, 3, 4, 5])
  const [activeId, setActiveId] = useState<any>(null)
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    }),
  )
  const onDragEnd = (event: any) => {
    const { over } = event
    console.log('over', over)
    const activeIndex = activeId ? items.indexOf(activeId) : -1
    const overIndex = items.indexOf(over?.id);
    if (activeIndex !== overIndex) {
      setItems(m => {
        return arrayMove(m, activeIndex, overIndex)
      })
    }
    if (!over?.id) {
      setActiveId(null)
    }
  }
  const renderContainerDragOverlay = (activeId: any) => {
    return <SortItem key={activeId} data={activeId} id={activeId} />
  }
  return (
    <div>
      <Breadcrumb items={[{ key: '1', label: '首页' }]} />
      <span>home</span>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
        onDragStart={({ active }: any) => {
          if (!active) {
            return;
          }
          setActiveId(active.id);
        }}
      >
        <div
          style={{
            margin: '0 auto',
            width: 500,
            height: 600,
          }}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map(m => (
              <SortItem key={m} data={m} id={m} />
            ))}
          </SortableContext>
        </div>
        <DragOverlay dropAnimation={null}>
          {activeId ? renderContainerDragOverlay(activeId) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}

export default Home
