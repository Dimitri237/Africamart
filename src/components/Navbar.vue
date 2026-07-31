<template>
    <header :class="['navbar', { scrolled }]">
        <div class="container nav-content">

            <RouterLink to="/" class="brand">

                <!-- Africa Mart -->
                <img src="../assets/images/logos/logo.png" alt="Africa Mart" class="logo" />


            </RouterLink>

            <nav :class="{ active: mobileMenu }">

                <RouterLink @click="closeMenu" to="/">Home</RouterLink>

                <RouterLink @click="closeMenu" to="/store">
                    Africa Mart
                </RouterLink>

                <RouterLink @click="closeMenu" to="/restaurant">
                    Restaurant
                </RouterLink>

                <RouterLink @click="closeMenu" to="/gallery">
                    Gallery
                </RouterLink>
                <RouterLink @click="closeMenu" to="/about">
                    About
                </RouterLink>

                <RouterLink @click="closeMenu" to="/contact">
                    Contact
                </RouterLink>

            </nav>
            <div class="lang">


                <button @click="changeLanguage('en')">
                    EN
                </button>


                <button @click="changeLanguage('fr')">
                    FR
                </button>


            </div>

            <div class="actions">
                <button class="menu-btn" @click="toggleMenu">

                    <i :class="mobileMenu ? 'fas fa-times' : 'fas fa-bars'"></i>

                </button>

            </div>

        </div>
    </header>
</template>

<script setup>
import { useLanguage }
    from "../composables/useLanguage"
import { ref, onMounted, onUnmounted } from "vue";

const {
    t,
    changeLanguage
} = useLanguage()
const mobileMenu = ref(false);
const scrolled = ref(false);

const toggleMenu = () => {
    mobileMenu.value = !mobileMenu.value;
};

const closeMenu = () => {
    mobileMenu.value = false;
};

const handleScroll = () => {
    scrolled.value = window.scrollY > 40;
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.navbar {

    position: fixed;

    top: 0;

    left: 0;

    width: 100%;

    z-index: 999;

    transition: .4s;

    padding: 18px 0;

}

.scrolled {

    background: rgba(17, 17, 17, .92);

    backdrop-filter: blur(15px);

    box-shadow: 0 5px 25px rgba(0, 0, 0, .15);

}

.lang button {

    border: none;

    background: #C99732;

    color: white;

    margin: 3px;

    padding: 8px 12px;

    border-radius: 20px;

}

.nav-content {

    display: flex;

    justify-content: space-between;

    align-items: center;

}

.brand {

    display: flex;

    align-items: center;

    gap: 15px;

}

.logo {
    width: 100px;
    height: 100px;

}

.second {

    height: 45px;

}

nav {

    display: flex;

    gap: 35px;

}

nav a {

    color: white;

    font-weight: 600;

    position: relative;

}

nav a::after {

    content: "";

    position: absolute;

    left: 0;

    bottom: -6px;

    height: 2px;

    width: 0;

    background: var(--orange);

    transition: .3s;

}

nav a:hover::after {

    width: 100%;

}

.actions {

    display: flex;

    align-items: center;

    gap: 20px;

}

.menu-btn {

    display: none;

    background: none;

    border: none;

    font-size: 25px;

    color: white;

    cursor: pointer;

}

@media(max-width:900px) {

    .menu-btn {

        display: block;

    }

    nav {

        position: fixed;

        top: 85px;

        left: -100%;

        width: 100%;

        background: #111;

        flex-direction: column;

        padding: 40px;

        transition: .4s;

    }

    nav.active {

        left: 0;

    }

}
</style>