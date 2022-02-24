<template>
    <Video
        isNew
        id="new-video"
        v-if="mode === 'add'"
        :mode="'edit'"
        @posted="$emit('posted')"
        @cancel="$emit('cancel')"
    />
    <Video v-for="video in videos" :key="video._id" :video="video" />
    <Typography v-if="videos.length === 0" variant="h5"
        >coming soon!</Typography
    >
</template>

<script>

import Video from './Video.vue'

export default {
    name: 'VideosList',
    emits: ['posted', 'cancel'],
    props: {
        videos: Array,
        mode: String,
    },
    components: {
        Video
    },
}
</script>