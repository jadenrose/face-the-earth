<template>
    <AddButton v-if="store.user.token" @click="() => setMode('add')" />
    <section class="Videos">
        <div class="music-videos">
            <Container>
                <Typography variant="h2">music videos</Typography>

                <div class="videos-list-container">
                    <VideosList
                        :mode="state.mode"
                        :videos="musicVideos"
                        @posted="() => setMode(null)"
                        @cancel="() => setMode(null)"
                    />
                </div>
            </Container>
        </div>

        <div class="live-performances">
            <Container>
                <Typography variant="h2">live performances</Typography>

                <div class="videos-list-container">
                    <VideosList
                        :mode="state.mode"
                        :videos="livePerformances"
                        @posted="() => setMode(null)"
                        @cancel="() => setMode(null)"
                    />
                </div>
            </Container>
        </div>

        <div class="lyric-videos">
            <Container>
                <Typography variant="h2">lyric videos</Typography>

                <div class="videos-list-container">
                    <VideosList
                        :mode="state.mode"
                        :videos="lyricVideos"
                        @posted="() => setMode(null)"
                        @cancel="() => setMode(null)"
                    />
                </div>
            </Container>
        </div>

        <div v-if="otherVideos.length" class="other-videos">
            <Container>
                <Typography variant="h2">other videos</Typography>

                <div class="videos-list-container">
                    <VideosList
                        :mode="state.mode"
                        :videos="otherVideos"
                        @posted="() => setMode(null)"
                        @cancel="() => setMode(null)"
                    />
                </div>
            </Container>
        </div>
    </section>
</template>

<script>
import { reactive, computed } from 'vue'

import store from '../store/store'
import { storeAllVideos } from '../store/videos'

import VideosList from '../components/VideosList.vue'

export default {
    name: 'Watch',
    components: {
        VideosList
    },
    async setup () {
        const state = reactive({
            mode: null
        })

        const setMode = (mode) => state.mode = mode

        if (!store.videos.list.length) await storeAllVideos()

        const musicVideos = computed(() => store.videos.musicVideos)
        const livePerformances = computed(() => store.videos.livePerformances)
        const lyricVideos = computed(() => store.videos.lyricVideos)
        const otherVideos = computed(() => store.videos.otherVideos)

        return {
            musicVideos,
            livePerformances,
            lyricVideos,
            otherVideos,
            store,
            state,
            setMode,
        }
    }
}
</script>

<style lang="scss">
.Videos {
    h2 {
        margin-bottom: 1em;
    }
    margin-top: 6em;
    padding: 8em 0;

    .videos-list-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        flex-direction: column;

        @include tablet {
            flex-direction: row;
            justify-content: left;
        }
    }
}

.music-videos,
.live-performances,
.lyric-videos {
    margin-bottom: 8em;
}
</style>