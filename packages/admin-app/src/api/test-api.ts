import api from './index'

interface paramsType {
  currentPage: number
  pageSize: number
}

export function getData({ currentPage, pageSize }: paramsType): any {
  return api.get(`/tasks`, {
    params: {
      _page: currentPage, 
      _per_page: pageSize
    },
  })
  
}
