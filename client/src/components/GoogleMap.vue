<template>
    <div class="GoogleMap">
        <h2>google map</h2>
        <CloseButton @close="$emit('close')" />
    </div>
</template>

<script>
export default {
    name: 'GoogleMap',
    emits: ['close']
}
</script>

<style lang="scss">
.GoogleMap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $background-light;
    display: flex;
    align-items: center;
    justify-content: center;

    .CloseButton {
        position: absolute;
        top: $spacing-small;
        right: $spacing-small;
        background: $background;
        padding: 0.7em;
        border-radius: 50%;
        width: 4em;
        height: 4em;
    }
}
</style>