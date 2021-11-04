<template>
    <header class="Navbar">
        <Container>
            <FTE />
            <Nav>
                <Navlist class="routerLinks" :items="routerLinks" />
                <Navlist class="extLinks" :items="extLinks" />
            </Nav>
        </Container>
    </header>
</template>

<script>
import { ref } from 'vue'

import FTE from '../components/FTE.vue'
import Nav from '../components/Nav.vue'
import Navlist from '../components/Navlist.vue'

export default {
    name: 'Navbar',
    components: {
        FTE,
        Nav,
        Navlist
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
                icon: 'fab fa-facebook',
                href: 'https://www.facebook.com/FacetheEarth'
            },
            {
                icon: 'fab fa-instagram',
                href: 'https://www.instagram.com/facetheearth'
            },
            {
                icon: 'fab fa-youtube',
                href: 'https://www.youtube.com/channel/UCynYkCrwJCfNNLc7Z03yhKA/featured'
            },
            {
                icon: 'fab fa-spotify',
                href: 'https://open.spotify.com/artist/3B8dM8jspZ4ADCUXvVszi6'
            },
        ])

        return { routerLinks, extLinks }
    }
}
</script>

<style lang="scss">
.Navbar {
    background: $background;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $spacing-small 0 0;
    z-index: 888;

    .Container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: none;
    }
}
</style>