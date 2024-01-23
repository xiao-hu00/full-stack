export interface ColumnsType {
  id: string
  header: string | ((column: any) => JSX.Element)
  accessorKey: string
  sort?: boolean
  size?: number
  cell?: (row: any) => JSX.Element
}

export interface CallbackType {
  pageIndex: number
  pageSize: number
}

export interface DataTableProps {
  columns: ColumnsType[]
  data?: Array[]
  loading?: boolean
  onChange?: (values: CallbackType) => void
  total?: number
}
