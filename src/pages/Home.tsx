import React, { useCallback } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import qs from "qs"

import { Categories } from "../components/Categories"
import { Sort, arrPopup } from "../components/Sort"
import Skeleton from "../components/PizzaBlock/skeleton"
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock"
import { Pagination } from "../components/Pagination/Pagination"

import { setCategoryId, setCurrentPage, setFilters, } from "../redux/filter/slice"
import { useAppDispatch } from "../redux/store"
import { getFilterSelector } from "../redux/filter/selectors"
import { getPizzasSelector } from "../redux/pizza/selectors"
import { setFiltersType } from "../redux/filter/types"
import { fetchPizzas } from "../redux/AsyncActions"

export const Home: React.FC = () => {
   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   const { items, status } = useSelector(getPizzasSelector)
   const { searchValue, currentPage, categoryId, sort } =
      useSelector(getFilterSelector)

   const isMounted = React.useRef(false)
   const isSearch = React.useRef(false)
   const sortProperty = sort.sortProperty
   const order = sort.order
   console.log("sortBy", sortProperty)
   console.log("order", order)

   // собирает данныесортировки и передает в слайс пицц
   const getPizzas = async () => {
      const sortBy = sort.sortProperty
      const order = sort.order
      const category = Number(categoryId) > 0 ? `&category=${categoryId}` : ""
      const search = searchValue ? `&search=${searchValue}` : ""

      dispatch(
         fetchPizzas({
            sortBy,
            order,
            category,
            search,
            currentPage: String(currentPage),
         }),
      )

      window.scrollTo(0, 0)
   }
   // собирает данные фильтрации из адресной строчки и отдает в фильтр слайс
   React.useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(window.location.search.substring(1))
         console.log("params", params)
         const sort = arrPopup.find(obj => obj.sortProperty === params.sortProperty)
         console.log("params", params)
         console.log("sort", sort)
         console.log("dispatch", { ...params, sort })

         if (sort) {
            const obj = { ...params, sort }
            console.log(obj)
            dispatch(setFilters(obj as setFiltersType))
         }
      }

      isSearch.current = true
   }, [])
   // вызывает функцию достающую пиццы из бекенда
   React.useEffect(() => {

      // if (!isSearch.current) {
      getPizzas()
      // }

      isSearch.current = true
   }, [categoryId, sort, searchValue, currentPage])
   // берет данные о фильтрах и встраивает их в адресную строку
   React.useEffect(() => {
      if (isMounted.current) {
         const queryString = qs.stringify({
            currentPage,
            categoryId,
            sortProperty,
            order,
         })
         console.log(queryString)
         navigate(`?${queryString}`)
      }
      isMounted.current = true
   }, [categoryId, currentPage, sortProperty, order])

   const onClickCategoryHandler = React.useCallback((id: number) => {
      const value = String(id)
      dispatch(setCategoryId(value))
   }, [])
   const onChangePage = useCallback((value: number) => {
      const page = String(value)
      dispatch(setCurrentPage(page))
   }, [])
   const skeletons = [...new Array(6)].map((_, index) => (
      <Skeleton key={index} />
   ))
   const pizzasForRender = items.map((obj: any) => {
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
