// LIBS
import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
// SLICES
import filter from "./slices/filterSlice"
import cart from "./slices/cartSlice"
import pizzas from "./slices/pizzasSlice"

export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
   reducer: {
      filter,
      cart,
      pizzas,
   },
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
