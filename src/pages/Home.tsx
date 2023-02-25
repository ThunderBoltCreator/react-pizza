import React from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router"
import qs from "qs"

import { Categories } from "../components/Categories"
import { Sort } from "../components/Sort"
import Skeleton from "../components/PizzaBlock/skeleton"
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock"
import { Pagination } from "../components/Pagination/Pagination"

import {
   getFilterSelector,
   setCategoryId,
   setCurrentPage,
} from "../redux/slices/filterSlice"
import { fetchPizzas, getPizzasSelector } from "../redux/slices/pizzasSlice"
import { useAppDispatch } from "../redux/store"

export const Home: React.FC = () => {
   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   const { items, status } = useSelector(getPizzasSelector)
   const isMounted = React.useRef(false)

   const { searchValue, currentPage, categoryId, sort } =
      useSelector(getFilterSelector)

   const sortBy = sort.sortProperty
   const order = sort.order

   const location = useLocation()
   React.useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(window.location.search.substring(1))
         console.log("params", params)
      }
   }, [])

   const getPizzas = async () => {
      const sortBy = sort.sortProperty
      const order = sort.order
      const category = categoryId > 0 ? `&category=${categoryId}` : ""
      const search = searchValue ? `&search=${searchValue}` : ""

      dispatch(
         fetchPizzas({
            sortBy,
            order,
            category,
            search,
            currentPage,
         })
      )

      window.scrollTo(0, 0)
   }

   React.useEffect(() => {
      getPizzas()
   }, [categoryId, sort, searchValue, currentPage])

   React.useEffect(() => {
      const queryString = qs.stringify({
         currentPage,
         categoryId,
         sortBy,
         order,
      })
      navigate(`?${queryString}`)
      console.log(queryString)
   }, [categoryId, currentPage, sortBy, order])

   const onClickCategoryHandler = React.useCallback((id: number) => {
      dispatch(setCategoryId(id))
   }, [])
   const onChangePage = (value: number) => {
      dispatch(setCurrentPage(value))
   }
   const skeletons = [...new Array(6)].map((_, index) => (
      <Skeleton key={index} />
   ))
   const pizzasForRender = items.map((obj: any) => {
      // console.log(obj);
      return <PizzaBlock key={obj.id} {...obj} />
   })

   return (
      <div className="container">
         <div className="content__top">
            <Categories
               value={categoryId}
               onClickCategory={onClickCategoryHandler}
            />
            <Sort value={sort} />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">
            {status === "loading" ? skeletons : pizzasForRender}
         </div>
         <Pagination onChangePage={onChangePage} />
      </div>
   )
}
