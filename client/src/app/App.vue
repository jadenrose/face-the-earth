<template>
    <Navbar />
    <Container>
        <router-view />
    </Container>
</template>

<script>
export default {
    name: 'App',
}
</script>

<style lang="scss">
// resets
*,
*:before,
*:after {
    box-sizing: border-box;
}

body {
    margin: 0;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    background: $background;
    color: $color-main;

    font-family: $family;
    font-weight: $normal;
}

h1,
h2,
h3 {
    font-weight: $bold;
}
</style>
