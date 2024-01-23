export interface ColumnsType {
  id: string
  header: string | ((column: column) => JSX.Element)
  accessorKey: string
  sort?: boolean
  size?: number
  cell?: (row: row) => JSX.Element
}

export interface CallbackType {
  pageIndex: number
  pageSize: number
}

export interface DataTableProps {
  columns: ColumnsType[]
  data?: Array[]
  loading?: boolean
  onChange?: (values: table) => void
  total?: number
}
