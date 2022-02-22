<template>
    <header v-if="route.name !== 'Login'">
        <AdminBar v-if="user" :user="user" />
        <Navbar />
    </header>
    <main>
        <suspense>
            <router-view />
        </suspense>
    </main>
</template>

<script>
import store from '../store/store'
import { provide, computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import jwt_decode from 'jwt-decode'

import { refreshToken } from '../store/user'
import { setScreenSize } from '../store/ui'
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

        const windowWidth = ref(0)

        refreshToken()

        const setWindowWidth = () => {
            const width = window.innerWidth
            windowWidth.value = width

            if (width > 1000 && store.ui.screenSize !== 'large') setScreenSize('large')
            if (width >= 700 && width <= 1000 && store.ui.screenSize !== 'medium') setScreenSize('medium')
            if (width < 700 && store.ui.screenSize !== 'small') setScreenSize('small')

        }

        onMounted(() => {
            setWindowWidth()
            window.addEventListener('resize', setWindowWidth)
        })
        onUnmounted(() => window.removeEventListener('resize', setWindowWidth))

        const user = computed(() => {
            try {
                const token = store.user.token

                return jwt_decode(token)
            } catch (err) {
                return null
            }
        })


        const route = useRoute()
        const showMobileMenu = computed(() => store.ui.showMobileMenu)

        return {
            user,
            route,
            showMobileMenu
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

html {
    font-size: 12px;

    @include tablet {
        font-size: 14px;
    }

    @include desktop {
        font-size: 16px;
    }
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

    text-align: center;

    @include tablet {
        text-align: left;
    }
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
    padding: 3em 0;
}

a {
    color: inherit;
    text-decoration: none;
    text-decoration-thickness: 2px;
}
</style>
