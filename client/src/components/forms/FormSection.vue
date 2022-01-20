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
    flex: 1 0 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &:last-child {
        margin-bottom: 0;
    }
}
</style>