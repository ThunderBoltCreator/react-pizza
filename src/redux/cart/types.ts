export type CartItem = {
   title: string
   imageUrl: string
   type: string
   size: number
   price: number
   count: number
   id: string
}
export type ChangeItemCountPayloadType = {
   id: string
   option: "inc" | "dec"
}

export interface CartSliceStateType {
   totalPrice: number
   items: CartItem[]
}