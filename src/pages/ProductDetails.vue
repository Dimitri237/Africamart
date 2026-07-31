<template>

<section class="product-page">

<div class="container">


<div class="product-box">


<div class="image-section">

<img 
:src="product.image"
:alt="product.name"
/>

</div>



<div class="info">


<span class="category">
{{product.category}}
</span>



<h1>
{{product.name}}
</h1>



<p>
{{product.description}}
</p>



<h3>
Choose size
</h3>


<div class="sizes">


<button
v-for="size in product.sizes"
:key="size.label"
:class="{active:selectedSize.label===size.label}"
@click="selectSize(size)"
>

{{size.label}}

</button>


</div>



<h3>
Quantity
</h3>


<div class="quantity">


<button @click="decrease">
-
</button>


<strong>
{{quantity}}
</strong>


<button @click="increase">
+
</button>


</div>



<div class="price">


<h2>
{{totalPrice}} FCFA
</h2>


</div>



<button 
class="cart"
@click="addCart"
>

🛒 Add to cart

</button>



</div>


</div>


</div>


</section>

</template>



<script setup>


import {ref,computed} from "vue"
import {useRoute} from "vue-router"


import tblanc from "../assets/images/products/tblanc.png"
import tjaune from "../assets/images/products/tjaune.png"
import miondo from "../assets/images/products/miondo.png"
import poivre from "../assets/images/products/poivre.png"



const route = useRoute()



const products={


"white-garri":{

name:"White Garri",

category:"Cassava Product",

description:
"Premium fermented cassava flakes from Cameroon.",

image:tblanc,


sizes:[

{
label:"500g",
price:1500
},

{
label:"1 Kg",
price:2500
},

{
label:"5 Kg",
price:10000
},

{
label:"10 Kg",
price:18000
}

]

},



"yellow-garri":{

name:"Yellow Garri",

category:"Traditional Food",

description:
"Golden cassava flakes with authentic African taste.",

image:tjaune,


sizes:[

{
label:"500g",
price:2000
},

{
label:"1 Kg",
price:3000
},

{
label:"5 Kg",
price:12000
}

]

},



"miondo":{

name:"Miondo",

category:"African Delicacy",

description:
"Traditional cassava sticks handmade in Cameroon.",

image:miondo,


sizes:[

{
label:"10 pieces",
price:2500
},

{
label:"25 pieces",
price:5000
},

{
label:"50 pieces",
price:9000
}

]

},



"white-pepper":{

name:"White Pepper",

category:"Seasoning",

description:
"Premium natural African spice.",

image:poivre,


sizes:[

{
label:"100g",
price:1500
},

{
label:"250g",
price:3000
},

{
label:"500g",
price:5500
}

]

}


}



const product =
products[route.params.id]



const selectedSize = ref(product.sizes[0])


const quantity = ref(1)



function selectSize(size){

selectedSize.value=size

}



function increase(){

quantity.value++

}



function decrease(){

if(quantity.value>1)
quantity.value--

}



const totalPrice = computed(()=>{

return selectedSize.value.price * quantity.value

})



function addCart(){

alert(
`${product.name} added (${quantity.value})`
)

}



</script>



<style scoped>


.product-page{

padding:120px 0;

background:

radial-gradient(
circle,
rgba(212,175,55,.15),
transparent
),

#faf8f2;

}



.container{

width:90%;

max-width:1200px;

margin:auto;

}



.product-box{

display:grid;

grid-template-columns:1fr 1fr;

gap:60px;

background:white;

padding:40px;

border-radius:35px;

box-shadow:
0 20px 50px rgba(0,0,0,.12);

}



.image-section img{

width:100%;

height:500px;

object-fit:cover;

border-radius:30px;

}



.category{

color:#d4af37;

font-weight:bold;

}



.info h1{

font-size:50px;

}



.info p{

color:#666;

line-height:1.7;

}



.sizes{

display:flex;

gap:15px;

flex-wrap:wrap;

}



.sizes button{

padding:12px 25px;

border-radius:30px;

border:1px solid #ddd;

background:white;

cursor:pointer;

}



.sizes .active{

background:#d4af37;

}



.quantity{

display:flex;

align-items:center;

gap:30px;

}



.quantity button{

width:45px;

height:45px;

border-radius:50%;

border:none;

background:#111;

color:white;

font-size:25px;

}



.price h2{

color:#d4af37;

font-size:35px;

}



.cart{

width:100%;

padding:18px;

border:none;

border-radius:40px;

background:#d4af37;

font-weight:bold;

font-size:18px;

}



@media(max-width:800px){


.product-box{

grid-template-columns:1fr;

}


.image-section img{

height:350px;

}


.info h1{

font-size:35px;

}


}

</style>