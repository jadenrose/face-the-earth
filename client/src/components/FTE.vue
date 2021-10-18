<template>
    <router-link class="FTE" to="/">
        <svg alt="face the earth logo" aria-label="face the earth logo">
            <use href="@/assets/img/fte.svg#img"></use>
        </svg>
    </router-link>
</template>

<script>
export default {
    name: 'FTE'
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