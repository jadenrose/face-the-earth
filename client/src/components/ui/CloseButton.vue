<template>
    <svg
        @click="$emit('close')"
        class="CloseButton"
        alt="close dialogue"
        aria-label="close dialogue"
    >
        <use href="@/assets/img/x.svg#img" />
    </svg>
</template>

<script>
export default {
    name: 'CloseButton',
    emits: ['close']
}
</script>

<style lang="scss">
.CloseButton {
    width: 3em;
    height: 3em;
    margin-left: 4em;
    cursor: pointer;

    &:hover {
        color: $accent-main;
    }
}
</style>