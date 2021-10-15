<template>
    <h1 class="HeroLogo" aria-label="Face the Earth" :style="sx">
        <img
            class="logo"
            src="@/assets/img/logo-big.svg"
            alt="Face the Earth"
            aria-label="Face the Earth"
        />
    </h1>
</template>

<script>
export default {
    name: 'HeroLogo',
    props: {
        sx: Object
    }
}
</script>

<style lang="scss">
.HeroLogo {
    margin: 0;

    .logo {
        display: block;
        width: 25em;
        height: auto;
    }
}
</style>