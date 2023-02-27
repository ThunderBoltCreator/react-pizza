// LIBS
import React, { useEffect, useRef, useState } from "react"
// COMPONENTS / TYPES /
import { setSort, SortType } from "../redux/slices/filterSlice"
import { useDispatch } from "react-redux"

type SortPropsType = {
   value: SortType
}

export const arrPopup: SortType[] = [
   { name: "популярности (DESC)", sortProperty: "rating", order: "desc" },
   { name: "популярности (ASC)", sortProperty: "rating", order: "asc" },
   { name: "цене (DESC)", sortProperty: "price", order: "desc" },
   { name: "цене (ASC)", sortProperty: "price", order: "asc" },
   { name: "алфавиту (DESC)", sortProperty: "title", order: "desc" },
   { name: "алфавиту (ASC)", sortProperty: "title", order: "asc" },
]

export const Sort: React.FC<SortPropsType> = React.memo(({ value }) => {
   const dispatch = useDispatch()
   const sort = value

   const [open, setOpen] = useState(false)


   const sortRef = useRef<HTMLDivElement>(null)

   const popupRender = () => {
      return arrPopup.map((item, itemIndex) => {
         return (
            <li
               key={itemIndex}
               className={sort.name === item.name ? "active" : ""}
               onClick={() => onClickSortHandler(item)}
            >
               {item.name}
            </li>
         )
      })
   }

   const switchOpen = () => {
      if (open === false) {
         setOpen(true)
      } else if (open === true) {
         setOpen(false)
      }
   }
   const onClickSortHandler = (obj: SortType): void => {
      dispatch(setSort(obj))
      switchOpen()
   }

   useEffect(() => {

      const clickOutside = (event: MouseEvent) => {
         if (
            sortRef.current &&
            !event.composedPath().includes(sortRef.current)
         ) {
            setOpen(false)
         }
      }

      document.body.addEventListener("click", clickOutside)

      return () => {
         document.body.removeEventListener("click", clickOutside)
      }
   }, [])

   return (
      <div ref={sortRef} className="sort">
         <div className="sort__label">
            <svg
               width="10"
               height="6"
               viewBox="0 0 10 6"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                  fill="#2C2C2C"
               />
            </svg>
            <b>Сортировка по:</b>
            <span onClick={switchOpen}>{sort.name}</span>
         </div>
         {open && (
            <div className="sort__popup">
               <ul>{popupRender()}</ul>
            </div>
         )}
      </div>
   )
})
