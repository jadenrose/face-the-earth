<template>
    <header class="Navbar">
        <Container>
            <FTE />
            <Nav>
                <RouterLinks v-if="screenSize === 'large'" />
                <OpenMobileMenu v-else />
                <SocialLinks v-if="screenSize !== 'small'" />
            </Nav>
            <MobileMenu v-if="showMobileMenu" />
        </Container>
    </header>
</template>

<script>
import { computed } from 'vue'

import store from '../store/store'

import FTE from './FTE.vue'
import Nav from './Nav.vue'
import OpenMobileMenu from './OpenMobileMenu.vue'
import MobileMenu from './MobileMenu.vue'
import RouterLinks from './RouterLinks.vue'
import SocialLinks from './SocialLinks.vue'

export default {
    name: 'Navbar',
    components: {
        FTE,
        Nav,
        OpenMobileMenu,
        MobileMenu,
        RouterLinks,
        SocialLinks
    },
    setup () {
        const screenSize = computed(() => store.ui.screenSize)
        const showMobileMenu = computed(() => store.ui.showMobileMenu)

        return { screenSize, showMobileMenu }
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