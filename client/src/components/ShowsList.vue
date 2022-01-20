<template>
    <Container>
        <section class="ShowsList">
            <Show
                isNew
                id="new-show"
                v-if="mode === 'add'"
                :mode="'edit'"
                @posted="$emit('posted')"
                @cancel="$emit('cancel')"
            />
            <Show v-for="show in shows" :key="show._id" :show="show" />
        </section>
    </Container>
</template>

<script>
import { computed } from 'vue'

import { storeAllShows } from '../store/shows'
import store from '../store/store'
import Show from './Show.vue'

export default {
    name: 'ShowsList',
    emits: ['posted', 'cancel'],
    props: {
        mode: String
    },
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

<style lang="scss">
.ShowsList {
    padding: 12em 0;
}
</style>