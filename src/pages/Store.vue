<template>

<section class="store">

<div class="container">


<div class="header reveal">

<img 
src="../assets/images/logos/logos.png"
alt="Africa Mart"
class="logo"
/>


<h1>
Africa Mart
</h1>


<p>
Authentic African groceries delivered with quality and tradition.
</p>


</div>



<div class="products">


<div
v-for="item in products"
:key="item.name"
class="product reveal"
>


<div 
class="badge"
:class="item.type"
>
{{item.badge}}
</div>



<img 
:src="item.image"
:alt="item.name"
/>



<div class="content">


<h2>
{{item.name}}
</h2>



<div class="stars">

⭐⭐⭐⭐⭐

</div>



<p>
{{item.description}}
</p>



<span>
{{item.category}}
</span>



<div class="price">

<strong>
${{item.price}}
</strong>

</div>


<RouterLink 
:to="`/product/${item.slug}`"
class="details"
>
View product
</RouterLink>
<!-- <button @click="add(item)">
🛒 Add to cart
</button> -->



</div>


</div>


</div>


</div>


</section>


</template>



<script setup>


import tblanc from "../assets/images/products/tblanc.png"
import tjaune from "../assets/images/products/tjaune.png"
import miondo from "../assets/images/products/miondo.png"
import poivre from "../assets/images/products/poivre.png"



const products=[


{
name:"White Garri",
slug:"white-garri",
category:"Cassava Product",
description:
"Premium fermented cassava flakes from Africa.",
price:"25",
badge:"Best Seller",
type:"best",
image:tblanc
},



{
name:"Yellow Garri",
slug:"Yellow Garri",
category:"Traditional Food",
description:
"Golden cassava flakes with authentic taste.",
price:"30",
badge:"Traditional",
type:"traditional",
image:tjaune
},



{
name:"Miondo",
slug:"Miondo",
category:"African Delicacy",
description:
"Traditional cassava sticks from Cameroon.",
price:"35",
badge:"Popular",
type:"popular",
image:miondo
},



{
name:"White Pepper",
slug:"White Pepper",
category:"Seasoning",
description:
"Natural African spices for delicious meals.",
price:"20",
badge:"Organic",
type:"organic",
image:poivre
}



]



function add(item){

alert(
`${item.name} added to cart`
)

}



// Scroll animation

const observer =
new IntersectionObserver(
(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show")

}

})

},
{
threshold:.15
}
)



setTimeout(()=>{

document
.querySelectorAll(".reveal")
.forEach(el=>observer.observe(el))

},100)



</script>



<style scoped>


.store{

position:relative;

padding:120px 0;

background:

radial-gradient(
circle at top,
rgba(212,175,55,.18),
transparent 45%
),

#faf8f2;

}



.container{

width:90%;

max-width:1400px;

margin:auto;

}



.header{

text-align:center;

}



.logo{

width:130px;

height:130px;

border-radius:50%;

object-fit:cover;

border:4px solid #d4af37;

}



.header h1{

font-size:65px;

margin-top:20px;

color:#1c1c1c;

}



.header p{

font-size:20px;

color:#666;

}



.products{


margin-top:70px;


display:grid;


grid-template-columns:

repeat(auto-fit,minmax(280px,1fr));


gap:35px;


}



.product{

position:relative;

background:white;

border-radius:30px;

overflow:hidden;

box-shadow:
0 20px 50px rgba(0,0,0,.1);

transition:.5s;

}



.product:hover{

transform:
translateY(-15px);

}



.product img{

width:100%;

height:260px;

object-fit:cover;

}



.badge{

position:absolute;

top:20px;

left:20px;

padding:8px 18px;

border-radius:30px;

font-weight:bold;

z-index:2;

}



.best{

background:#d4af37;

}



.traditional{

background:#8b4513;

color:white;

}



.popular{

background:#27ae60;

color:white;

}



.organic{

background:#3498db;

color:white;

}



.content{

padding:25px;

}



.content h2{

font-size:28px;

}



.stars{

margin:10px 0;

}



.content p{

color:#666;

line-height:1.6;

}



.content span{

color:#d4af37;

font-weight:bold;

}



.price{

display:flex;

justify-content:space-between;

align-items:center;

margin:20px 0;

}



.price strong{

font-size:24px;

color:#1c1c1c;

}



.price small{

color:#777;

}



button{

width:100%;

padding:15px;

border:none;

border-radius:50px;

background:#d4af37;

font-weight:bold;

cursor:pointer;

transition:.3s;

}



button:hover{

transform:scale(1.05);

}



.reveal{

opacity:0;

transform:translateY(50px);

transition:1s;

}



.show{

opacity:1;

transform:none;

}


@media(max-width:700px){

.header h1{

font-size:38px;

}


}

</style>