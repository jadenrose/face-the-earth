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
export default {
    name: 'Shows',
}
</script>

<style lang="scss">
</style>