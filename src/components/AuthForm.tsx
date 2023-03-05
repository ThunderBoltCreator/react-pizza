import React from "react"

export const AuthForm: React.FC = ({ title: string }) => {
   return (
      <div>
         <input type="email" placeholder="email" />
         <input type="password" placeholder="password" />
         <button>{title}</button>
      </div>
   )
}
