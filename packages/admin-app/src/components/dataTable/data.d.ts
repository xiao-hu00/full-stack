export interface ColumnsType {
  id: string
  header: string | ((column: column) => JSX.Element)
  accessorKey: string
  sort?: boolean
  size?: number
  cell?: (row: row) => JSX.Element
  enableSorting?: boolean
  enableHiding?: boolean
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
  tableHeaderList?: object // 显示/隐藏列 的中文映射
  enableRowSelection?: boolean // 是否能选择行数据
}
