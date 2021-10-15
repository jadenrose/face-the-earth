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

export default {
    name: 'Navbar',
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
                icon: 'fa-facebook',
                href: 'https://www.facebook.com/FacetheEarth'
            },
            {
                icon: 'fa-instagram',
                href: 'https://www.instagram.com/facetheearth'
            },
            {
                icon: 'fa-youtube',
                href: 'https://www.youtube.com/channel/UCynYkCrwJCfNNLc7Z03yhKA/featured'
            },
            {
                icon: 'fa-spotify',
                href: 'https://open.spotify.com/artist/3B8dM8jspZ4ADCUXvVszi6'
            },
        ])

        return { routerLinks, extLinks }
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
    padding: 2em 0;
    z-index: 999;

    .Container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: none;
    }
}
</style>