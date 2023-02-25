import React from "react"

import s from "./ErrorBlock.module.scss"

export const ErrorBlock: React.FC = () => {
   return (
      <div className={s.root}>
         <h1>;( ничего не найдено</h1>
         <p className={s.description}>Данная страница отсутствует!</p>
      </div>
   )
}
