import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getCartFromLS } from "../../utils/getCartFromLS"
import { calcCartTotalPrice } from "../../utils/calcCartTotalPrice"
import { CartItem, CartSliceStateType, ChangeItemCountPayloadType } from "./types"

const { items, totalPrice } =  getCartFromLS()

const initialState: CartSliceStateType = {
   items: items,
   totalPrice: totalPrice
}

const slice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      addCartItem(state, action: PayloadAction<CartItem>) {
         const findItem = state.items.find(
            (obj) => obj.id === action.payload.id
         )
         if (findItem) {
            findItem.count++
         } else {
            state.items.push({
               ...action.payload,
               count: 1,
            })
         }
      },
      changeTotalPrice(state) {
         state.totalPrice = calcCartTotalPrice(state.items)
      },
      changeItemCount(
         state,
         action: PayloadAction<ChangeItemCountPayloadType>
      ) {
         const findItem = state.items.find(
            (obj) => obj.id === action.payload.id
         )

         if (findItem) {
            if (action.payload.option === "inc") {
               findItem.count++
            }
            if (action.payload.option === "dec") {
               findItem.count--
            }
         }
      },

      changeItemPrice(state, action) {
         // state.items
         return
      },

      deleteCartItem(state, action: PayloadAction<string>) {
         state.items = state.items.filter((obj) => obj.id !== action.payload)
      },

      clearCart(state) {
         state.items = []
         state.totalPrice = 0
      },
   },
})

export const {
   addCartItem,
   changeItemCount,
   changeTotalPrice,
   deleteCartItem,
   clearCart,
} = slice.actions

export default slice.reducer
