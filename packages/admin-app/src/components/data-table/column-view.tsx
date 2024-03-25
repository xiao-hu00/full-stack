'use client'
import { useMemo, useState } from 'react'
import { Table } from '@tanstack/react-table'
import { Button } from '../ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'

import {
  closestCenter,
  DndContext,
  MouseSensor,
  useSensor,
  useSensors,
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
import { SortableItem } from './sortable-item'
interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
  tableHeaderList: any
  setColumnOrder: (state: any) => void
  columnOrder: string[]
}

export function ColumnView<TData>({
  table,
  tableHeaderList,
  columnOrder,
  setColumnOrder,
}: DataTableViewOptionsProps<TData>) {
  const [activeId, setActiveId] = useState<any>(null)
  const onDragEnd = ({ over }: DragEndEvent) => {
    const activeIndex = activeId ? columnOrder.indexOf(activeId) : -1
    if (over) {
      const overIndex = columnOrder.indexOf(over.id + '')

      if (activeIndex !== overIndex) {
        const newIndex = overIndex
        setColumnOrder((m: string[]) => arrayMove(m, activeIndex, newIndex))
        console.log(arrayMove(columnOrder, activeIndex, newIndex))
      }
    }
    if (!over?.id) {
      setActiveId(null)
    }
  }
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    })
  )
  const measuring: MeasuringConfiguration = {
    droppable: {
      strategy: MeasuringStrategy.Always,
    },
  }
  const newColumn = useMemo(() => {
    const originColumn = table
      .getAllColumns()
      .filter(
        column =>
          typeof column.accessorFn !== 'undefined' && column.getCanHide()
      )
    const list = columnOrder
      .map(item => {
        const obj = originColumn.find(m => m.id === item)
        if (obj) {
          return obj
        }
      })
      .filter(m => !!m?.id)
    console.log('list', list)
    return list
  }, [columnOrder])
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>设置列</Button>
      </PopoverTrigger>
      <PopoverContent className='p-4 w-32' align='end'>
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
          <SortableContext
            items={columnOrder}
            strategy={verticalListSortingStrategy}
          >
            {newColumn.map(column => (
              <SortableItem
                id={column?.id}
                key={column?.id}
                tableHeaderList={tableHeaderList}
                column={column}
              />
            ))}
          </SortableContext>
        </DndContext>
      </PopoverContent>
    </Popover>
  )
}
