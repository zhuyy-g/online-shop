import { BrowserRouter, Routes, Route } from "react-router-dom"

import App from "./app"
import Home from "./pages/home"
import Cart from "./pages/cart"
import GoodsDetail from "./pages/detail"
import Login from "./pages/login/login"
import Register from "./pages/login/register"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<App />}>
                    <Route path="/" element={<Home />} />
                    <Route path="cart" element={<Cart />} />
                </Route>
                <Route path="detail/:id" element={<GoodsDetail />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
