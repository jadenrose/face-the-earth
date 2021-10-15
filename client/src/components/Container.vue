<template>
    <div class="Container">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'Container'
}
</script>

<style lang="scss">
.Container {
    width: $container-width;
    max-width: 1200px;
    margin: 0 auto;
}
</style>