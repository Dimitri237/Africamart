<template>

<section class="container gallery">


<h1>
Our Gallery
</h1>


<div class="grid">


<img
v-for="img in images"
:key="img"
:src="img"
/>


</div>


</section>

</template>



<script setup>


const images=[

"/src/assets/images/gallery1.jpg",
"/src/assets/images/gallery2.jpg",
"/src/assets/images/gallery3.jpg",
"/src/assets/images/gallery4.jpg",
"/src/assets/images/gallery5.jpg",
"/src/assets/images/gallery6.jpg"

]


</script>


<style scoped>


.gallery{

padding:100px 0;

}



.gallery h1{

text-align:center;

font-size:50px;

}



.grid{

display:grid;

grid-template-columns:
repeat(3,1fr);

gap:25px;

margin-top:50px;

}


.grid img{

height:300px;

width:100%;

object-fit:cover;

border-radius:25px;

transition:.4s;

}


.grid img:hover{

transform:scale(1.05);

}



@media(max-width:700px){

.grid{

grid-template-columns:1fr;

}

}



</style>