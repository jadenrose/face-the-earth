<template>
    <Navlist class="RouterLinks" :items="routerLinks" />
</template>

<script>
import { ref } from 'vue'

import Navlist from './Navlist.vue'

export default {
    name: 'RouterLinks',
    components: {
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

        return {
            routerLinks
        }
    }
}
</script>

<style>
</style>