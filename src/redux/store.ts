// LIBS
import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
// SLICES
import filter from "redux/filter/slice"
import cart from "redux/cart/slice"
import pizzas from "redux/pizza/slice"
import user from "redux/user/slice"

export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
   reducer: {
      filter,
      cart,
      pizzas,
      user
   },
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
