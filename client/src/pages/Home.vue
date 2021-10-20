<template>
    <HeroLogo :sx="{ marginBottom: '6em' }" />
    <Button big>
        <Typography>check out our music</Typography>
    </Button>
</template>

<script>
import HeroLogo from '../components/HeroLogo.vue'

export default {
    name: 'Home',
    components: {
        HeroLogo
    }
}
</script>