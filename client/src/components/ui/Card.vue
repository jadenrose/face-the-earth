<template>
    <div class="Card" :style="{ ...sx }">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        sx: Object
    }
}
</script>

<style lang="scss">
.Card {
    background: $background-light;
    border-radius: 8px;

    &[clickable]:hover {
        background: $background-hover;
    }
}
</style>