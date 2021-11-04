<template>
    <div class="FormSection">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'FormSection'
}
</script>

<style lang="scss">
.FormSection {
    position: relative;
    width: 100%;

    &:last-child {
        margin-bottom: 0;
    }
}
</style>