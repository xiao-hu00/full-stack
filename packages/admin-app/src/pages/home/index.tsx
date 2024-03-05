import { Breadcrumb } from '@/components'
import { useState } from 'react'
import {
  closestCenter,
  DndContext,
  MouseSensor,
  useSensor,
  useSensors,
  DragOverlay,
  MeasuringStrategy,
} from '@dnd-kit/core'
import type {
  DragStartEvent,
  DragEndEvent,
  MeasuringConfiguration,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import SortableItem from './SortableItem'

const Home = () => {
  const [items, setItems] = useState<any>([1, 2, 3, 4, 5])
  const [activeId, setActiveId] = useState<any>(null)
  const measuring: MeasuringConfiguration = {
    droppable: {
      strategy: MeasuringStrategy.Always,
    },
  }
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    })
  )
  const onDragEnd = ({ over }: DragEndEvent) => {
    const activeIndex = activeId ? items.indexOf(activeId) : -1
    if (over) {
      const overIndex = items.indexOf(over.id)

      if (activeIndex !== overIndex) {
        const newIndex = overIndex

        setItems((m: any) => arrayMove(m, activeIndex, newIndex))
      }
    }
    if (!over?.id) {
      setActiveId(null)
    }
  }
  const renderContainerDragOverlay = (activeId: any) => {
    return <SortableItem key={activeId} id={activeId} />
  }
  return (
    <div>
      <Breadcrumb items={[{ key: '1', label: '首页' }]} />
      <span>列表拖拽排序</span>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
        measuring={measuring}
        onDragStart={({ active }: DragStartEvent) => {
          if (!active) {
            return
          }
          setActiveId(active.id)
        }}
      >
        <div className='w-60'>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <div>
              {items.map((m: any) => (
                <SortableItem key={m} id={m} />
              ))}
            </div>
          </SortableContext>
        </div>
        <DragOverlay>
          {activeId ? renderContainerDragOverlay(activeId) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}

export default Home
