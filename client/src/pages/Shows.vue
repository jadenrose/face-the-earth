<template>
    <suspense>
        <template #default>
            <ShowsList />
        </template>
        <template #fallback>
            <Typography variant="h2">loading...</Typography>
        </template>
    </suspense>
</template>

<script>
import ShowsList from '../components/ShowsList.vue'

export default {
    name: 'Shows',
    components: {
        ShowsList
    }
}
</script>

<style lang="scss">
</style>