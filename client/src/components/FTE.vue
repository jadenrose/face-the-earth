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
a.FTE {
    opacity: 1;
    cursor: pointer;

    &:hover {
        color: inherit;
    }

    svg {
        width: 6em;
        height: 4em;
    }
}
</style>