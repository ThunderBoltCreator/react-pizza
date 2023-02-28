import React from "react"

type CategoriesPropsType = {
   value: string
   onClickCategory: (id: number) => void
}

export const Categories: React.FC<CategoriesPropsType> = React.memo(
   ({ value, onClickCategory }) => {
      const categories = [
         "Все",
         "Мясные",
         "Вегетерианские",
         "Гриль",
         "Острые",
         "Закрытые",
      ]

      const categoriesForRender = () => {
         return categories.map((categoryName, i) => {
            return (
               <li
                  key={i}
                  onClick={() => onClickCategory(i)}
                  className={Number(value) === i ? "active" : ""}
               >
                  {categoryName}
               </li>
            )
         })
      }

      return (
         <div className="categories">
            <ul>{categoriesForRender()}</ul>
         </div>
      )
   }
)
