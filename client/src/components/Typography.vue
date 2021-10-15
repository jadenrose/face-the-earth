<template>
    <h1 v-if="variant === 'h1'" :style="{ fontSize: `${2.5 * size}em` }">
        <slot />
    </h1>
    <h2 v-else-if="variant === 'h2'" :style="{ fontSize: `${2 * size}em` }">
        <slot />
    </h2>
    <span v-else class="Typography" :style="{ fontSize: `${size}em` }">
        <slot />
    </span>
</template>

<script>
export default {
      
    name: 'Typography',
    props: {
        variant: String,
        size: {
            type: Number,
            default: 1,
        }
    }
}
</script>

<style lang="scss">
.Typography {
    letter-spacing: 1px;

    &[bold] {
        font-weight: $bold;
    }
}
</style>