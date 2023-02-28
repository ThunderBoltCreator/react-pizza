import { RootState } from "../store"

export const getCartSelector = (state: RootState) => state.cart
export const getCartItemSelector = (id: string) => (state: RootState) =>
   state.cart.items.find((obj) => obj.id === id)