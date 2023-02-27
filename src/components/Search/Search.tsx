import React, { ChangeEvent, MouseEvent } from "react"

import s from "./search.module.scss"
import { useCallback, useRef, useState } from "react"
import debounce from "lodash.debounce"
import { setSearchValue } from "../../redux/slices/filterSlice"
import { useDispatch } from "react-redux"

export const Search: React.FC = () => {
   const dispatch = useDispatch()
   const inputRef = useRef<HTMLInputElement>(null)

   const [inputValue, setInputValue] = useState("")

   const onClearInput = (event: MouseEvent<SVGElement>) => {
      dispatch(setSearchValue(""))
      setInputValue("")

      inputRef.current?.focus()

      // if (inputRef.current) {
      //   inputRef.current.focus();
      // }
   }
   const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
      updateSearchValue(e.target.value)
   }
   const updateSearchValue = useCallback(
      debounce((str) => {
         dispatch(setSearchValue(str))
      }, 250),
      []
   )
   return (
      <div className={s.wrapper}>
         <svg
            className={s.searchIcon}
            height="48"
            viewBox="0 0 48 48"
            width="48"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path d="M31 28h-1.59l-.55-.55c1.96-2.27 3.14-5.22 3.14-8.45 0-7.18-5.82-13-13-13s-13 5.82-13 13 5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55v1.58l10 9.98 2.98-2.98-9.98-10zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" />
            <path d="M0 0h48v48h-48z" fill="none" />
         </svg>
         {inputValue && (
            <svg
               onClick={onClearInput}
               className={s.closeIcon}
               height="512px"
               id="Layer_1"
               version="1.1"
               viewBox="0 0 512 512"
               width="512px"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" />
            </svg>
         )}

         <input
            ref={inputRef}
            className={s.input}
            placeholder="Поиск пиццы"
            value={inputValue}
            onChange={onChangeInput}
         />
      </div>
   )
}
