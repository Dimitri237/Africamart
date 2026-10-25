import { createRouter, createWebHistory }
    from "vue-router"
import Home from "../pages/Home.vue"
import Gallery from "../pages/Gallery.vue"
import About from "../pages/AboutPage.vue"
import Contact from "../pages/ContactPage.vue"
import StorePage from "../pages/Store.vue";
import ProductDetailPage from "../pages/ProductDetails.vue";
import CartPage from "../pages/Cart.vue";



const routes = [

    {
        path: "/",
        component: Home
    },
    {
        path: "/store",
        name: "Store",
        component: StorePage
    },
    {
        path: "/product/:id",
        name: "ProductDetail",
        component: ProductDetailPage,
        props: true
    },
    {
        path: "/cart",
        name: "Cart",
        component: CartPage
    },

    {
        path: "/gallery",
        component: Gallery
    },

    {
        path: "/about",
        component: About
    },

    {
        path: "/contact",
        component: Contact
    }


]


export default createRouter({

    history: createWebHistory(),

    routes

})