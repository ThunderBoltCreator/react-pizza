import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface SortType {
   name: string
   sortProperty: "rating" | "price" | "title"
   order: "desc" | "asc"
}
interface FilterSliceType {
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

const initialState: FilterSliceType = {
   categoryId: '0',
   sort: {
      name: "популярности (DESC)",
      sortProperty: "rating",
      order: "desc",
   },
   searchValue: "",
   currentPage: '1',
}

const filterSlice = createSlice({
   name: "filters",
   initialState,
   reducers: {
      setFilters(state,action: PayloadAction<setFiltersType>) {
         state.sort = action.payload.sort
         state.categoryId = action.payload.categoryId
         state.currentPage = action.payload.currentPage
      },
      setCategoryId(state, action: PayloadAction<string>) {
         state.categoryId = action.payload
      },
      setSort(state, action: PayloadAction<SortType>) {
         state.sort = action.payload
      },
      setSearchValue(state, action: PayloadAction<string>) {
         state.searchValue = action.payload
      },
      setCurrentPage(state, action: PayloadAction<string>) {
         state.currentPage = action.payload
      },
   },
})

export const getFilterSelector = (state: RootState) => state.filter

export const { setCategoryId, setSort, setSearchValue, setCurrentPage, setFilters } =
   filterSlice.actions

export default filterSlice.reducer
