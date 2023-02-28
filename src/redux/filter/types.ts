export interface SortType {
   name: string
   sortProperty: "rating" | "price" | "title"
   order: "desc" | "asc"
}
export interface FilterSliceType {
   categoryId: string
   sort: SortType
   searchValue?: string
   currentPage: string
}

export type setFiltersType = {
   sort: SortType
   categoryId: string
   currentPage: string
}