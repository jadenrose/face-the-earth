<template>
    <AddButton v-if="store.user.token" @click="() => setMode('add')" />
    <section class="Shows">
        <div class="upcoming-shows">
            <Container>
                <Typography variant="h2">upcoming shows</Typography>
                <div class="shows-list-container">
                    <ShowsList
                        :mode="state.mode"
                        :shows="upcomingShows"
                        @posted="() => setMode(null)"
                        @cancel="() => setMode(null)"
                    />
                </div>
            </Container>
        </div>
        <div class="past-shows">
            <Container>
                <Typography variant="h2">past shows</Typography>
                <div class="shows-list-container">
                    <ShowsList
                        :mode="state.mode"
                        :shows="pastShows"
                        @posted="() => setMode(null)"
                        @cancel="() => setMode(null)"
                    />
                </div>
            </Container>
        </div>
    </section>
</template>

<script>
import { reactive, computed } from '@vue/reactivity'

import store from '../store/store'
import { storeAllShows } from '../store/shows'

import ShowsList from '../components/ShowsList.vue'

export default {
    name: 'Shows',
    components: {
        ShowsList
    },
    async setup () {
        const state = reactive({
            mode: null,
        })

        const setMode = (mode) => state.mode = mode

        if (!store.shows.list.length) await storeAllShows()

        return {
            store,
            setMode,
            state,
            upcomingShows: computed(() => store.shows.upcomingShows),
            pastShows: computed(() => store.shows.pastShows),
        }
    }
}
</script>

<style lang="scss">
.Shows {
    h2 {
        margin-bottom: 1em;
    }
    margin-top: 6em;
    padding: 8em 0;

    .shows-list-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        flex-direction: column;

        @include tablet {
            flex-direction: row;
        }
    }
}

.upcoming-shows {
    margin-bottom: 8em;
}
</style>