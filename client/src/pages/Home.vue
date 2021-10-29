<template>
    <HomeAdd v-if="mode === 'add'" />
    <section class="Home">
        <div class="hero">
            <HeroLogo />
            <Button big>
                <Typography>check out our music</Typography>
            </Button>
        </div>
    </section>
    <suspense>
        <template #default>
            <ArticlesList />
        </template>
        <template #fallback>
            <Typography variant="h2">loading...</Typography>
        </template>
    </suspense>
</template>

<script>
import { provide, computed } from 'vue'

import store from '../store/store'
import HeroLogo from '../components/HeroLogo.vue'
import HomeAdd from './tools/HomeAdd.vue'
import ArticlesList from '../components/ArticlesList.vue'

export default {
    name: 'Home',
    components: {
        HeroLogo,
        HomeAdd,
        ArticlesList
    },
    setup () {
        provide('store', store)

        const mode = computed(() => store.ui.mode)

        return {
            mode,
        }
    }
}
</script>

<style lang="scss">
.Home {
    height: 100vh;
    display: flex;
    align-items: center;
}

.HomeAdd {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($background, 0.95);
    display: flex;
    align-items: center;
    z-index: 999;

    .Form {
        display: flex;
        flex-direction: column;
        background: $background-light;
        width: 90%;
        max-width: 700px;
        padding: 3em;
        border-radius: 4px;
        box-shadow: 10px 10px 100px $background;
    }

    .buttons {
        align-self: center;
        justify-content: center;
    }

    .button-wrapper {
        padding: 1em 2em 0;
    }
}
</style>