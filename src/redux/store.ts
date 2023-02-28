// LIBS
import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
// SLICES
import filter from "./filter/slice"
import cart from "./cart/slice"
import pizzas from "./pizza/slice"

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
