<template>
    <header>
        <Navbar />
    </header>
    <main>
        <Container :sx="{ paddingTop: '15em' }">
            <router-view v-if="token" name="admin" />
            <router-view v-else />
        </Container>
    </main>
</template>

<script>
import store from '../store/store'
import { provide } from 'vue'

import Navbar from '../components/Navbar.vue'

export default {
    name: 'App',
    components: {
        Navbar
    },
    setup () {
        provide('store', store)

        const { token } = store.state.user

        return {
            token
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
