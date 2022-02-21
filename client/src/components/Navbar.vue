<template>
    <header class="Navbar">
        <Container>
            <FTE />
            <Nav>
                <Navlist
                    v-if="screenSize === 'large'"
                    class="routerLinks"
                    :items="routerLinks"
                />
                <OpenMobileMenu v-else />
                <Navlist
                    v-if="screenSize !== 'small'"
                    class="extLinks"
                    :items="extLinks"
                />
            </Nav>
            <MobileMenu
                v-if="showMobileMenu"
                :routerLinks="routerLinks"
                :extLinks="extLinks"
            />
        </Container>
    </header>
</template>

<script>
import { ref, computed } from 'vue'

import store from '../store/store'

import FTE from '../components/FTE.vue'
import Nav from '../components/Nav.vue'
import Navlist from '../components/Navlist.vue'
import OpenMobileMenu from '../components/OpenMobileMenu.vue'
import MobileMenu from '../components/MobileMenu.vue'

export default {
    name: 'Navbar',
    components: {
        FTE,
        Nav,
        Navlist,
        OpenMobileMenu,
        MobileMenu
    },
    setup () {
        const routerLinks = ref([
            {
                label: 'home',
                to: '/'
            },
            {
                label: 'shows',
                to: '/shows'
            },
            {
                label: 'book us',
                to: '/contact'
            },
            {
                label: 'watch us',
                to: '/watch'
            },
        ])

        const extLinks = ref([
            {
                img: 'facebook.png',
                href: 'https://www.facebook.com/FacetheEarth'
            },
            {
                img: 'insta.png',
                href: 'https://www.instagram.com/facetheearth'
            },
            {
                img: 'youtube.png',
                href: 'https://www.youtube.com/channel/UCynYkCrwJCfNNLc7Z03yhKA/featured'
            },
            {
                img: 'spotify.png',
                href: 'https://open.spotify.com/artist/3B8dM8jspZ4ADCUXvVszi6'
            },
        ])

        const screenSize = computed(() => store.ui.screenSize)
        const showMobileMenu = computed(() => store.ui.showMobileMenu)

        return { routerLinks, extLinks, screenSize, showMobileMenu }
    }
}
</script>

<style lang="scss">
.Navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 888;
    padding: 2em 0;
    background: rgb(0, 0, 0);
    background: linear-gradient(
        180deg,
        rgba($background, 0.8) 0%,
        rgba($background, 0.4) 85%,
        rgba($background, 0) 100%
    );

    .Container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: none;
    }

    .routerlinks {
        order: 1;
    }

    .extLinks {
        order: 2;
    }

    .OpenMobileMenu {
        order: 3;
    }
}
</style>