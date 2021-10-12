<template>
    <header class="Navbar">
        <FTE />
        <Nav :items="items" />
    </header>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'Navbar',
    setup () {
        const items = ref([
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

        return { items }
    }
}
</script>

<style lang="scss">
.Navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 2em 3em;
}
</style>