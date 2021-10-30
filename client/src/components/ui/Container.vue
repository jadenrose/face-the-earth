<template>
    <div class="Container" :style="{ ...sx }">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'Container',
    props: {
        sx: Object
    }
}
</script>

<style lang="scss">
.Container {
    width: $container-width;
    max-width: 1200px;
    margin: 0 auto;

    &[center] {
        min-height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}
</style>