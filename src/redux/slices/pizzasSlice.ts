import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"

export enum Status {
   LOADING = "loading",
   OKAY = "success",
   ERROR = "error",
}

export interface PizzaItemType {
   id: string
   imageUrl: string
   title: string
   types: number[]
   sizes: number[]
   price: number
   category: number
   rating: number
}
interface PizzasSliceType {
   items: PizzaItemType[]
   status: Status
}

const initialState: PizzasSliceType = {
   items: [],
   status: Status.LOADING,
}

type FetchPizzasParamsType = {
   currentPage: number
   category: string
   sortBy: string
   order: string
   search: string
}
export const fetchPizzas = createAsyncThunk<
   PizzaItemType[],
   FetchPizzasParamsType
>("pizzas/fetchPizzasStatus", async (params) => {
   const { currentPage, category, sortBy, order, search } = params
   const { data } = await axios.get<PizzaItemType[]>(
      `https://63d98ec9b28a3148f6757e99.mockapi.io/pizzas?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
   )
   return data
})

const pizzasSlice = createSlice({
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

export const getPizzasSelector = (state: RootState) => state.pizzas

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
