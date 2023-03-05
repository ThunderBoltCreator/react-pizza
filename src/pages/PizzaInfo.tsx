import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import axios from "axios"

type PizzaType = {
   imageUrl: string
   title: string
   price: string
}

export const PizzaInfo: React.FC = () => {
   const [pizza, setPizza] = useState<PizzaType>()

   const { id } = useParams()
   const navigate = useNavigate()

   useEffect(() => {
      async function fetchPizza() {
         try {
            const { data } = await axios.get(
               "https://63d98ec9b28a3148f6757e99.mockapi.io/pizzas/" + id
            )
            setPizza(data)
         } catch {
            alert("Ой, оно, оно сломалось!")
            navigate("/")
         }
      }
      fetchPizza()
   }, [id])

   if (!pizza) {
      return <>"Загрузка... !"</>
   }

   return (
      <>
         <h1>{pizza.title}</h1>
         <img src={pizza.imageUrl} alt="Pizza" />
         <span>{pizza.price} руб.</span>
      </>
   )
}
