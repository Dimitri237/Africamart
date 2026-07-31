<template>
<section class="restaurant">


<div class="container">


<div class="title">
<img src="../assets/images/logos/logor.jpg" alt="Africa Mart" class="logo" />
<h1>
Michelle's Restaurant
</h1>


<p>
African • European • International Cuisine
</p>


</div>



<div class="menu">


<div 
v-for="meal in meals"
:key="meal.name"
class="card"
>


<img :src="meal.image">


<h2>
{{meal.name}}
</h2>


<p>
{{meal.description}}
</p>

<button
@click="reserve"
>
Order

</button>
</div>


</div>


</div>


</section>

</template>



<script setup>


const meals=[


{
name:"Eru/ Afan soup",
description:
"Cameroonian traditional dish prepared with passion.",
image:"/src/assets/images/restaurant/eru.png"
},


{
name:"Ndolé",
description:
"Cameroonian traditional dish prepared with passion.",
image:"/src/assets/images/restaurant/ndole.jpeg"
},


{
name:"Vegetable",
description:
"Cameroonian traditional dish prepared with passion.",
image:"/src/assets/images/restaurant/legume.jpeg"
}


]


</script>



<style scoped>


.restaurant{

background:#111;

color:white;

padding:100px 0;

}



.title{

text-align:center;

}



.title h1{

font-size:55px;

color:#d4af37;

}



.menu{

margin-top:60px;

display:grid;

grid-template-columns:
repeat(3,1fr);

gap:40px;

}



.card{

background:#1d1d1d;

border-radius:25px;

overflow:hidden;

}


.card img{

height:300px;

width:100%;

object-fit:cover;

}



.card h2,
.card p{

padding:15px 25px;

}



@media(max-width:800px){

.menu{

grid-template-columns:1fr;

}

}



</style>