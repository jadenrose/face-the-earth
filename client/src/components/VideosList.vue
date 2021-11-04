<template>
    <section class="VideosList">
        <Video v-for="video in videos" :key="video._id" :video="video" />
    </section>
</template>

<script>
import { computed } from 'vue'

import store from '../store/store'
import { storeAllVideos } from '../store/videos'
import Video from './Video.vue'

export default {
    name: 'VideosList',
    components: {
        Video
    },
    async setup () {
        if (!store.videos.list.length) await storeAllVideos()

        const videos = computed(() => store.videos.list)

        return {
            videos
        }
    }
}
</script>

<style>
.VideosList {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>