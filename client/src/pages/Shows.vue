<template>
    <section class="Shows">
        <Container>
            <Typography variant="h1">Shows</Typography>
        </Container>
    </section>
</template>

<script>
import store from '../store/store'

export default {
    name: 'Shows',
    mounted () {
        store.storeAllShows()
    }
}
</script>

<style lang="scss">
.Shows {
    .Container {
        padding-top: 12em;
    }
}
</style>