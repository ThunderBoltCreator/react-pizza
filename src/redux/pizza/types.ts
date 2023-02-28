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
export interface PizzasSliceType {
   items: PizzaItemType[]
   status: Status
}
export type FetchPizzasParamsType = {
   currentPage: string
   category: string
   sortBy: string
   order: string
   search: string
}