import { createAsyncThunk } from "@reduxjs/toolkit"
import { FetchPizzasParamsType, PizzaItemType } from "./pizza/types"
import axios from "axios"

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