<template>
    <section class="ShowsList">
        <Show v-for="show in shows" :key="show._id" :show="show" />
    </section>
</template>

<script>
import { computed } from 'vue'

import { storeAllShows } from '../store/shows'
import store from '../store/store'
import Show from './Show.vue'

export default {
    name: 'ShowsList',
    components: {
        Show
    },
    async setup () {
        if (!store.shows.list.length) await storeAllShows()

        const shows = computed(() => store.shows.list)

        return {
            shows,
        }
    },
}
</script>