<template>

<section class="store">

<div class="container">


<div class="header">
<img src="../assets/images/logos/logos.png" alt="Africa Mart" class="logo" />
<h1>
Authentic African groceries delivered with quality and tradition.
</h1>

</div>



<div class="products">


<div 
class="product"
v-for="item in products"
:key="item.name"
>


<img :src="item.image">


<h3>
{{item.name}}
</h3>


<p>
{{item.description}}
</p>


<span>
{{item.category}}
</span> <br>
<strong>

{{item.price}} $

</strong> <br>
<button
@click="add(item)">
Add to cart
</button>


</div>


</div>


</div>

</section>

</template>


<script setup>


const products=[

{
name:"White Garri",
category:"Cassava Product",
description:
"Premium fermented cassava flakes from Africa.",
image:"/src/assets/images/products/tblanc.png"
},


{
name:"Yellow Garri",
category:"Traditional Food",
description:
"Golden cassava flakes with authentic taste.",
image:"/src/assets/images/products/tjaune.png"
},


{
name:"Miondo",
category:"African Delicacy",
description:
"Traditional cassava sticks.",
image:"/src/assets/images/products/miondo.png"
},


{
name:"White pepper",
category:"Seasoning",
description:
"Natural spices for African cuisine.",
image:"/src/assets/images/products/poivre.png"
}

]


</script>


<style scoped>


.store{

padding:100px 0;

}



.header{

text-align:center;

margin-bottom:70px;

}


.header h1{

font-size:60px;

color:var(--secondary);

}



.products{

display:grid;

grid-template-columns:
repeat(4,1fr);

gap:30px;

}



.product{

background:white;

border-radius:25px;

padding:25px;

box-shadow:var(--shadow);

transition:.3s;

}



.product:hover{

transform:
translateY(-10px);

}



.product img{

height:220px;

width:100%;

object-fit:cover;

border-radius:20px;

}



.product span{

color:var(--primary);

font-weight:bold;

}



@media(max-width:900px){

.products{

grid-template-columns:
repeat(2,1fr);

}

}



@media(max-width:600px){

.products{

grid-template-columns:1fr;

}

}



</style>