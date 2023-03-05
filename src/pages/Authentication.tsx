import { useAuth } from "hooks/useAuth"
import React, { ChangeEvent, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { LoginPage } from "./LoginPage"

export const Authentication = () => {
   return (
      <>
         <h1>Добро пожаловать на страницу авторизации!</h1>
         <p>
            Здесь вы можете{" "}
            <Link to="/auth/registration">зарегестрироваться</Link> или{" "}
            <Link to="/auth/login">залогиниться</Link>!
         </p>
      </>
   )
}
