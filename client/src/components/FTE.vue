<template>
    <router-link class="FTE" to="/" :style="sx">
        <img src="@/assets/img/Symbol.png" alt="FTE Logo" />
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

    img {
        color: $color-main;
        width: 6em;
        height: auto;
    }
}
</style>