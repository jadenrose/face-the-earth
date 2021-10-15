<template>
    <section class="hero-section">
        <Container>
            <HeroLogo :sx="{ marginBottom: '6em' }" />
            <Button>
                <Typography>check out our music</Typography>
            </Button>
        </Container>
    </section>
</template>

<script>
export default {
    name: 'Home'
}
</script>