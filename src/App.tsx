import { Route, Routes } from "react-router-dom"

import "./scss/app.scss"

import { Home } from "./pages/Home"
import { Cart } from "./pages/Cart"
import { Error } from "./pages/Error"
import PizzaInfo from "./pages/PizzaInfo"
import { MainLayout } from "./pages/MainLayout"

function App() {
   return (
      <Routes>
         <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="pizza/:id" element={<PizzaInfo />} />
            <Route path="*" element={<Error />} />
         </Route>
      </Routes>
   )
}

export default App
