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
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
}
</style>