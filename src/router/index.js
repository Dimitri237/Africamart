import {createRouter,createWebHistory}
from "vue-router"

import Cart from "../pages/Cart.vue"

import Home from "../pages/Home.vue"
import Store from "../pages/Store.vue"
import Restaurant from "../pages/Restaurant.vue"
import Gallery from "../pages/Gallery.vue"
import About from "../pages/AboutPage.vue"
import Contact from "../pages/ContactPage.vue"



const routes=[

{
path:"/",
component:Home
},
{
 path:"/product/:id",
 name:"ProductDetails",
 component:()=>import("../pages/ProductDetails.vue")
},
{
path:"/cart",
component:Cart
},
{
path:"/store",
component:Store
},

{
path:"/restaurant",
component:Restaurant
},

{
path:"/gallery",
component:Gallery
},

{
path:"/about",
component:About
},

{
path:"/contact",
component:Contact
}


]


export default createRouter({

history:createWebHistory(),

routes

})