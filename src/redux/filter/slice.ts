import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FilterSliceType, setFiltersType, SortType } from "./types"

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

const slice = createSlice({
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

export const { setCategoryId, setSort, setSearchValue, setCurrentPage, setFilters } =
   slice.actions

export default slice.reducer
