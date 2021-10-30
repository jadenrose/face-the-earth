<template>
    <router-link class="FTE" to="/" :style="sx">
        <svg alt="face the earth logo" aria-label="face the earth logo">
            <use href="@/assets/img/fte.svg#img"></use>
        </svg>
    </router-link>
</template>

<script>
export default {
    name: 'FTE',
    props: {
        sx: {
            type: Object,
            default: () => { },
        }
    }
}
</script>

<style lang="scss">
.FTE {
    cursor: pointer;

    svg {
        color: $color-main;
        width: 6em;
        height: 4em;
    }
}
</style>