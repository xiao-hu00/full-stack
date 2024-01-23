import React from 'react'

export interface ColumnsType {
  id: string
  header: string | (() => React.ReactNode)
  accessorKey: string
  sort?: boolean
  size?: number
  cell?: () => React.ReactNode
}

export interface CallbackType {
  pageIndex: number
  pageSize: number
}

export interface Task {
  id: string
  paymentStatus: string
  totalAmount: string
  paymentMethod: string
}

export interface DataTableProps {
  columns: ColumnsType[]
  data?: Task[]
  loading?: boolean
  onChange?: (values: CallbackType) => void
  total?: number
}
