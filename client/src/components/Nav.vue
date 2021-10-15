<template>
    <nav class="Nav">
        <slot />
    </nav>
</template>

<script>
export default {
    name: 'Nav',
}
</script>

<style lang="scss">
.Nav {
    display: flex;
    align-items: center;
}
</style>