// LIBS
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// COMPONENTS AND PAGES
import { addCartItem, changeTotalPrice, } from "../../redux/cart/slice"
import { store } from "../../redux/store"
// TYPES
import { PizzaItemType } from "../../redux/pizza/types"
import { Link } from "react-router-dom"
import { getCartItemSelector } from "../../redux/cart/selectors"
import { CartItem } from "../../redux/cart/types"

export const PizzaBlock: React.FC<PizzaItemType> = ({
   title = "Название куда-то пропало",
   price,
   imageUrl,
   sizes,
   types,
   id,
}) => {
   const dispatch = useDispatch()
   const [sizeIndex, setSizeIndex] = useState<number>(0)
   const [typeIndex, setTypeIndex] = useState<number>(0)

   const cartItem = useSelector(getCartItemSelector(id))

   const countCartItems = cartItem ? cartItem.count : 0

   const arrTypes = ["тонкое", "традиционное"]

   const addItemCartOnClick = () => {
      const item: CartItem = {
         id,
         title,
         size: sizes[sizeIndex],
         type: arrTypes[typeIndex],
         price,
         imageUrl,
         count: 0,
      }
      dispatch(addCartItem(item))
      dispatch(changeTotalPrice())
   }

   const typesForRender = () => {
      return types.map((t, i) => {
         return (
            <li
               key={t}
               className={typeIndex === i ? "active" : ""}
               onClick={() => setTypeIndex(t)}
            >
               {arrTypes[t]}
            </li>
         )
      })
   }

   const sizesForRender = () => {
      return sizes.map((s, i) => {
         return (
            <li
               key={i}
               className={sizeIndex === i ? "active" : ""}
               onClick={() => setSizeIndex(i)}
            >
               {s} см.
            </li>
         )
      })
   }

   return (
      <div className="pizza-block">
         <Link to={`/pizza/${id}`}>
            <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
            <h4 className="pizza-block__title">{title}</h4>
         </Link>
         <div className="pizza-block__selector">
            <ul>{typesForRender()}</ul>
            <ul>{sizesForRender()}</ul>
         </div>
         <div className="pizza-block__bottom">
            <div className="pizza-block__price">от {price} руб.</div>
            <div className="button button--outline button--add">
               <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                     fill="white"
                  />
               </svg>
               <span onClick={addItemCartOnClick}>Добавить</span>
               {countCartItems > 0 && <i>{countCartItems}</i>}
            </div>
         </div>
      </div>
   )
}
