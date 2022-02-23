<template>
    <div class="MobileMenu">
        <div>
            <RouterLinks class="mobile" @close="handleClose" />
            <SocialLinks class="mobile" @close="handleClose" />
        </div>
        <svg @click="handleClose" class="close">
            <use href="@/assets/img/x.svg#img"></use>
        </svg>
    </div>
</template>

<script>
import { closeMobileMenu } from '../store/ui'

import RouterLinks from './RouterLinks.vue'
import SocialLinks from './SocialLinks.vue'

export default {
    name: 'MobileMenu',
    components: {
        RouterLinks,
        SocialLinks
    },
    setup () {
        const handleClose = () => closeMobileMenu()

        return {
            handleClose
        }
    }
}
</script>

<style lang="scss">
.MobileMenu {
    position: fixed;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: $background;
    font-size: 2em;

    ul {
        margin: 0;
        padding: 0;
    }

    .RouterLinks.mobile {
        flex-direction: column;
        margin-bottom: 3em;

        .linkText {
            padding: 1em 0.5em;
        }
    }

    .ExtLinks.mobile {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .navitem .linkIcon {
        padding: 0;
        margin: 0 0.5em;
    }

    .close {
        position: fixed;
        top: 2em;
        right: 2em;
        width: 2em;
        height: 2em;
    }
}
</style>