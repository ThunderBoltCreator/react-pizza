import { calcCartTotalPrice } from "./calcCartTotalPrice"

export const getCartFromLS = () => {
   const data = localStorage.getItem('cart')
   const items = data ? JSON.parse(data) : []
   console.log(items)
   const totalPrice = calcCartTotalPrice(items)

   return {
      items,
      totalPrice
   }
}