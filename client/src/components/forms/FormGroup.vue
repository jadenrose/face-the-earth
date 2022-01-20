<template>
    <div class="FormGroup">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'FormGroup'
}
</script>

<style lang="scss">
.FormGroup {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    margin-bottom: $spacing-small;

    &:last-child {
        margin-bottom: 0;
    }
}
</style>