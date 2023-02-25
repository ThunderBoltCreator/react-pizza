import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface SortType {
   name: string
   sortProperty: "rating" | "price" | "title"
   order: "desc" | "asc"
}
interface FilterSliceType {
   categoryId: number
   sort: SortType
   searchValue: string
   currentPage: number
}

const initialState: FilterSliceType = {
   categoryId: 0,
   sort: {
      name: "популярности (DESC)",
      sortProperty: "rating",
      order: "desc",
   },
   searchValue: "",
   currentPage: 1,
}

const filterSlice = createSlice({
   name: "filters",
   initialState,
   reducers: {
      setCategoryId(state, action: PayloadAction<number>) {
         state.categoryId = action.payload
      },
      setSort(state, action: PayloadAction<SortType>) {
         state.sort = action.payload
      },
      setSearchValue(state, action: PayloadAction<string>) {
         state.searchValue = action.payload
      },
      setCurrentPage(state, action: PayloadAction<number>) {
         state.currentPage = action.payload
      },
   },
})

export const getFilterSelector = (state: RootState) => state.filter

export const { setCategoryId, setSort, setSearchValue, setCurrentPage } =
   filterSlice.actions

export default filterSlice.reducer
