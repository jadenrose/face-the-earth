<template>
    <h1 class="HeroLogo" aria-label="Face the Earth">
        <svg alt="Face the Earth" aria-label="Face the Earth">
            <use href="@/assets/img/logo-big.svg#img"></use>
        </svg>
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

    svg {
        width: 20em;
        height: 15em;
        margin-bottom: 6em;
    }
}
</style>