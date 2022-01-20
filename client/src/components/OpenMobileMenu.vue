<template>
    <svg
        @click="handleOpenMobileMenu"
        class="OpenMobileMenu"
        alt="open mobile menu"
        aria-label="open mobile menu"
    >
        <use href="@/assets/img/menu.svg#img" />
    </svg>
</template>

<script>
import { openMobileMenu } from '../store/ui'

export default {
    name: 'OpenMobileMenu',
    setup () {
        const handleOpenMobileMenu = () => {
            openMobileMenu()
        }

        return {
            handleOpenMobileMenu
        }
    }
}
</script>

<style lang="scss">
.OpenMobileMenu {
    width: 3em;
    height: 3em;
    margin-left: 4em;
    cursor: pointer;

    &:hover {
        color: $accent-main;
    }
}
</style>