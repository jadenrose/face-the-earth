<template>
    <AddButton v-if="store.user.token" @click="() => setMode('add')" />
    <suspense>
        <template #default>
            <VideosList
                :mode="state.mode"
                @posted="() => setMode(null)"
                @cancel="() => setMode(null)"
            />
        </template>
        <template #fallback>
            <Typography variant="h2">loading...</Typography>
        </template>
    </suspense>
</template>

<script>
import { reactive } from 'vue'

import store from '../store/store'

import VideosList from '../components/VideosList.vue'

export default {
    name: 'Watch',
    components: {
        VideosList
    },
    setup () {
        const state = reactive({
            mode: null
        })

        const setMode = (mode) => state.mode = mode

        return {
            store,
            state,
            setMode,
        }
    }
}
</script>