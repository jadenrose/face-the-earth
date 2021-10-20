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
    display: flex;
    flex-direction: column;
    cursor: pointer;
    width: 100%;
    margin-bottom: $spacing-small;
}
</style>