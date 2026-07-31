<template>

<section class="about">


<div class="container">


<h1>
Our Story
</h1>


<p>

Africa Mart & Michelle's Restaurant were created
to bring authentic African flavors closer to everyone.

From traditional products to unforgettable meals,
we celebrate culture, quality and hospitality.

</p>


<div class="info">


<div>

<h2>
Quality
</h2>

<p>
Selected products and fresh ingredients.
</p>

</div>


<div>

<h2>
Culture
</h2>

<p>
Sharing African traditions worldwide.
</p>

</div>


<div>

<h2>
Experience
</h2>

<p>
Premium service for every customer.
</p>

</div>


</div>


</div>


</section>

</template>



<style scoped>


.about{

padding:120px 0;

text-align:center;

}



.about p{

font-size:20px;

line-height:1.8;

}



.info{

display:grid;

grid-template-columns:
repeat(3,1fr);

gap:30px;

margin-top:60px;

}



.info div{

background:white;

padding:40px;

border-radius:25px;

box-shadow:var(--shadow);

}


@media(max-width:700px){

.info{

grid-template-columns:1fr;

}

}


</style>