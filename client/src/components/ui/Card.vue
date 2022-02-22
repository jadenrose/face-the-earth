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
    border-radius: 2px;

    &[clickable]:hover {
        background: $background-hover;
    }

    &[no-background] {
        background: none;
    }
}
</style>