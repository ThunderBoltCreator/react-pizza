import React from "react"
import ReactPaginate from "react-paginate"
import { useSelector } from "react-redux"

import s from "./pagination.module.scss"
import { getFilterSelector } from "../../redux/filter/selectors"

type PaginationPropsType = {
   onChangePage: (page: number) => void
}

export const Pagination: React.FC<PaginationPropsType> = ({ onChangePage }) => {
   const { currentPage } = useSelector(getFilterSelector)

   return (
      <div>
         <ReactPaginate
            className={s.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(event) => onChangePage(+event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={Number(currentPage) - 1}
         />
      </div>
   )
}
