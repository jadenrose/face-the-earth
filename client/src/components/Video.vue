<template>
    <Card class="Video">
        <Typography center variant="h2" :sx="{ marginBottom: '1em' }">
            {{ video.title }}
        </Typography>
        <div class="loading-text">
            <Typography center>loading video...</Typography>
        </div>
        <iframe
            class="youtube-embed"
            :src="`https://www.youtube-nocookie.com/embed/${video.url
                .split('/')
                .pop()}`"
            :title="`${video.title} (Youtube)`"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
        />
    </Card>
</template>

<script>
export default {
    name: 'Video',
    props: {
        video: {
            type: Object,
            default: () => { },
        }
    }
}
</script>

<style lang="scss">
$youtube-embed-width: 600px;
$youtube-embed-height: calc($youtube-embed-width * 9 / 16);

.Video {
    margin: 0 auto $spacing-big;
    padding: 2em;
    width: auto;
    min-width: 0;
    position: relative;
    z-index: 0;

    .loading-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translatex(-50%);
        z-index: -1;
    }

    .youtube-embed {
        display: block;
        width: $youtube-embed-width;
        height: $youtube-embed-height;
        border-radius: 8px;
        z-index: 2;
    }
}
</style>