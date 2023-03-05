import { RootState } from "./../redux/store"
import React from "react"
import { useSelector } from "react-redux"

export const useAuth = () => {
   const { userEmail, userName } = useSelector((state: RootState) => state.user)

   return {
      isAuth: !!userEmail,
      userEmail,
      userName,
   }
}
