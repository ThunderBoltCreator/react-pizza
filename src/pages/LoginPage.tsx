import { AuthForm } from "components/AuthForm"
import React from "react"
import { Link } from "react-router-dom"

export const LoginPage = () => {
   return (
      <>
         <h2>Авторизация</h2>
         <p>Войдите в аккаунт!</p>
         <p>
            Если аккаунта нет - пройдите{" "}
            {<Link to="/registration">регистрацию</Link>}
         </p>
         <AuthForm />
      </>
   )
}
