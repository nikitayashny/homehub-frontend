//import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
//import Basket from "./pages/Basket"
//import ProductPage from "./pages/ProductPage"
import Shop from "./pages/Shop"
//import Orders from "./pages/Orders"
//import OrderPage from "./pages/OrderPage"
//import Aboutus from "./pages/Aboutus"
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/consts"

export const authRoutes = [
    // {
    //     path: BASKET_ROUTE,
    //     Component: Basket
    // },
    // {
    //     path: ORDER_ROUTE,
    //     Component: Orders
    // },
    // {
    //     path: ORDER_ROUTE + '/:userId' + '/:orderId',
    //     Component: OrderPage
    // }
]

export const adminRoutes = [
    // {
    //     path: ADMIN_ROUTE,
    //     Component: Admin
    // },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    // {
    //     path: PRODUCT_ROUTE + '/:id',
    //     Component: ProductPage
    // },
    // {
    //     path: ABOUTUS_ROUTE,
    //     Component: Aboutus
    // }
]