import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

export type CartItem = {
   title: string
   imageUrl: string
   type: string
   size: number
   price: number
   count: number
   id: string
}
type ChangeItemCountPayloadType = {
   id: string
   option: "inc" | "dec"
}

interface CartSliceStateType {
   totalPrice: number
   items: CartItem[]
}

const initialState: CartSliceStateType = {
   totalPrice: 0,
   items: [],
}

const cartSlice = createSlice({
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
         state.totalPrice = state.items.reduce((sum, obj) => {
            return obj.price * obj.count + sum
         }, 0)
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

export const getCartSelector = (state: RootState) => state.cart
export const getCartItemSelector = (id: string) => (state: RootState) =>
   state.cart.items.find((obj) => obj.id === id)

export const {
   addCartItem,
   changeItemCount,
   changeTotalPrice,
   deleteCartItem,
   clearCart,
} = cartSlice.actions

export default cartSlice.reducer
