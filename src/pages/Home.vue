<template>


<section class="hero">


<div class="overlay"></div>



<div class="content">


<h1>

{{t("hero","title")}}

</h1>


<p>

{{t("hero","subtitle")}}

</p>



<div class="buttons">


<a class="btn">

{{t("hero","store")}}

</a>



<a class="btn second">

{{t("hero","restaurant")}}

</a>


</div>


</div>



</section>




<section class="story container">


<h2>

{{t("story","title")}}

</h2>


<p>

{{t("story","text")}}

</p>


</section>





<section class="brands">



<div>


<h2>
Africa Mart
</h2>


<p>

{{t("store","text")}}

</p>


</div>




<div>


<h2>
Michelle's Restaurant
</h2>


<p>

{{t("restaurant","text")}}

</p>


</div>



</section>



</template>



<script setup>


import {useLanguage}
from "../composables/useLanguage"



const {t}=useLanguage()



</script>




<style scoped>



.hero{


height:100vh;


background:

url("/src/assets/images/hero.jpg");


background-size:cover;

background-position:center;


display:flex;

align-items:center;


position:relative;


color:white;


}



.overlay{


position:absolute;

inset:0;


background:

linear-gradient(
90deg,
rgba(0,0,0,.8),
rgba(0,0,0,.3)
);


}



.content{

position:relative;

z-index:2;

margin-left:8%;

max-width:800px;

}



h1{

font-size:75px;

line-height:1.05;

font-weight:900;

}



.content p{

font-size:25px;

margin:30px 0;

}



.buttons{

display:flex;

gap:20px;

}



.second{

background:white;

color:#111;

}



.story{

padding:120px 0;

text-align:center;

}



.story h2{

font-size:55px;

}



.story p{

font-size:22px;

line-height:1.8;

}




.brands{


display:grid;

grid-template-columns:1fr 1fr;


}



.brands div{


padding:100px;


background:#163A24;

color:white;

text-align:center;


}



.brands div:last-child{


background:#111;


}




@media(max-width:700px){


h1{

font-size:45px;

}


.brands{

grid-template-columns:1fr;

}


}



</style>