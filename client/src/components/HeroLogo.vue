<template>
    <h1 class="HeroLogo" aria-label="Face the Earth">
        <img src="@/assets/img/Font.png" alt="Face the Earth Logo" />
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

    img {
        display: block;
        margin: 0;
        padding: 0;
        width: 22em;
        max-width: 100%;
        margin-bottom: 4em;
    }
}
</style>