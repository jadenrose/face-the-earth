<template>
    <header v-if="route.name !== 'Login'">
        <Navbar />
    </header>
    <main>
        <Container :sx="{ paddingTop: route.name !== 'Login' ? '20em' : 0 }">
            <router-view />
        </Container>
    </main>
</template>

<script>
import store from '../store/store'
import { provide, computed } from 'vue'
import { useRoute } from 'vue-router'

import Navbar from '../components/Navbar.vue'


export default {
    name: 'App',
    components: {
        Navbar
    },
    setup () {
        provide('store', store)

        const user = computed(() => store.state.user)

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
</style>
