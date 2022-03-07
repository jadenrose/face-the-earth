<template>
    <AddButton v-if="store.user.token" @click="() => setMode('add')" />
    <section class="Home">
        <Container>
            <div class="hero">
                <HeroLogo />
                <a
                    href="https://open.spotify.com/artist/3B8dM8jspZ4ADCUXvVszi6"
                    target="_blank"
                >
                    <FancyButton big label="check out our music" />
                </a>
            </div>
        </Container>
        <div class="video-container">
            <video autoplay :muted="state.muted" loop>
                <source
                    :src="`${BASE_URL}/api/images/6226667a7717e1dec9f4f371`"
                    type="video/mp4"
                />
            </video>
        </div>
        <i
            @click="toggleVolume"
            :class="`fas ${
                state.muted ? 'fa-volume-mute' : 'fa-volume-up'
            } volume-button`"
        ></i>
    </section>
    <suspense>
        <template #default>
            <ArticlesList
                :mode="state.mode"
                @posted="setMode(null)"
                @cancel="setMode(null)"
            />
        </template>
        <template #fallback>
            <Typography variant="h2">loading...</Typography>
        </template>
    </suspense>
</template>

<script>
import { reactive } from 'vue'

import store from '../store/store'
import HeroLogo from '../components/HeroLogo.vue'
import ArticlesList from '../components/ArticlesList.vue'

export default {
    name: 'Home',
    components: {
        HeroLogo,
        ArticlesList
    },
    setup () {
        const BASE_URL = process.env.VUE_APP_BACKEND_URI || 'http://localhost:5000'

        const state = reactive({
            mode: null,
            muted: true,
        })

        const setMode = (mode) => state.mode = mode

        const toggleVolume = () => state.muted = !state.muted

        return {
            BASE_URL,
            store,
            state,
            setMode,
            toggleVolume
        }
    }
}
</script>

<style lang="scss">
.Home {
    margin-top: 6em;
    padding: 8em 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 0;
    position: relative;
    overflow: hidden;
}

.hero {
    max-width: 70vw;
    margin: 0 auto;

    @include tablet {
        margin: 0;
    }
}

.video-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 75vw;
    min-height: 100%;
    z-index: -1;
    overflow: hidden;

    video {
        object-fit: cover;
        height: 100%;
        width: 100%;
        opacity: 0.2;
    }
}

.volume-button {
    color: $color-main;
    font-size: 2.4rem;
    position: absolute;
    bottom: 5vw;
    right: 5vw;
    cursor: pointer;
    padding: 0.6em;
    background: $background;
    border-radius: 50%;
    opacity: 0.6;

    &:hover {
        color: $accent-main;
    }

    &:active {
        color: $color-main;
    }
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