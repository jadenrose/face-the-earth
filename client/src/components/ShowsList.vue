<template>
    <Show
        isNew
        id="new-show"
        v-if="mode === 'add'"
        :mode="'edit'"
        @posted="$emit('posted')"
        @cancel="$emit('cancel')"
    />
    <Show v-for="show in shows" :key="show._id" :show="show" />
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
    margin-top: 6em;
    padding: 8em 0;

    .Container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        flex-direction: column;

        @include tablet {
            flex-direction: row;
        }
    }
}
</style>