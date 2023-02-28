import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { PizzasSliceType, Status } from "./types"
import { fetchPizzas } from "../AsyncActions"





const initialState: PizzasSliceType = {
   items: [],
   status: Status.LOADING,
}

const slice = createSlice({
   name: "pizzas",
   initialState,
   reducers: {
      setItems(state, action) {
         state.items = action.payload
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING
            state.items = []
         })
         .addCase(fetchPizzas.fulfilled, (state, action) => {
            state.status = Status.OKAY
            state.items = action.payload
         })
         .addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR
            state.items = []
         })
   },
})


export const { setItems } = slice.actions

export default slice.reducer
