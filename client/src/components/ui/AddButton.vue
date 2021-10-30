<template>
    <div class="AddButton" @click="() => $emit('click')" title="add an item">
        <i class="fas fa-plus" />
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.AddButton {
    position: fixed;
    right: 1em;
    top: 25%;
    font-size: 3em;
    background: $accent-main;
    color: $background;
    border-radius: 50%;
    width: 1.5em;
    height: 1.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 999;

    &:hover {
        background: $accent-hover;
    }
}
</style>