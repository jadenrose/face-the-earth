<template>
    <header v-if="route.name !== 'Login'">
        <AdminBar v-if="user" :user="user" />
        <Navbar />
    </header>
    <main>
        <Container
            :sx="{
                paddingTop:
                    route.name !== 'Login' && route.name !== 'Home'
                        ? '15em'
                        : 0,
            }"
        >
            <router-view />
        </Container>
    </main>
</template>

<script>
import store from '../store/store'
import { provide, computed } from 'vue'
import { useRoute } from 'vue-router'
import jwt_decode from 'jwt-decode'

import { refreshToken } from '../store/user'
import Navbar from '../components/Navbar.vue'
import AdminBar from '../components/AdminBar.vue'


export default {
    name: 'App',
    components: {
        Navbar,
        AdminBar,
    },
    setup () {
        provide('store', store)

        refreshToken()

        const user = computed(() => {
            try {
                const token = store.user.token

                return jwt_decode(token)
            } catch (err) {
                return null
            }
        })


        const route = useRoute()

        return {
            user,
            route
        }
    }
}
</script>

<style lang="scss">
// resets
*,
*:before,
*:after {
    box-sizing: border-box;
}

body {
    margin: 0;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    background: $background;
    color: $color-main;

    font-family: $family;
    font-weight: $normal;
}

.hero-section {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

h1,
h2,
h3 {
    font-weight: $bold;
}

section {
    margin-bottom: $spacing-big;
}
</style>
