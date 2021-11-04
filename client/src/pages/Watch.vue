<template>
    <suspense>
        <template #default>
            <VideosList />
        </template>
        <template #fallback>
            <Typography variant="h2">loading...</Typography>
        </template>
    </suspense>
</template>

<script>
import VideosList from '../components/VideosList.vue'

export default {
    name: 'Watch',
    components: {
        VideosList
    }
}
</script>

<style>
</style>