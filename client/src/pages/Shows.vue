<template>
    <Container>
        <AddButton v-if="store.user.token" @click="() => setMode('add')" />
        <suspense>
            <template #default>
                <ShowsList
                    :mode="mode"
                    @posted="() => setMode(null)"
                    @cancel="() => setMode(null)"
                />
            </template>
            <template #fallback>
                <Typography variant="h2">loading...</Typography>
            </template>
        </suspense>
    </Container>
</template>

<script>
import { reactive, computed } from '@vue/reactivity'

import store from '../store/store'

import ShowsList from '../components/ShowsList.vue'

export default {
    name: 'Shows',
    components: {
        ShowsList
    },
    setup () {
        const state = reactive({
            mode: null
        })

        const setMode = (mode) => state.mode = mode
        const mode = computed(() => state.mode)

        return {
            store,
            setMode,
            mode,
        }
    }
}
</script>