<template>
    <div class="Artist">
        <a class="artist link" :href="artist.link" target="_blank">
            <Typography small>{{ artist.name }}</Typography>
        </a>
        <div
            v-if="editable"
            @click="$emit('remove-me', artist._id)"
            class="remove"
        >
            <AwesomeIcon icon="fa fa-times" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        artist: Object,
        editable: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style lang="scss">
.Artist {
    position: relative;
    background: $accent-main;
    color: $background;
    padding: 0.6em 0.8em;
    border-radius: 6px;
    font-weight: $bold;
    overflow: hidden;
    margin: 1em 0;
    cursor: pointer;
    display: flex;
    align-items: center;

    .Typography {
        display: block;
    }

    .remove {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        background: $accent-main;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &:hover {
        background: $accent-hover;

        .Typography {
            color: $background;
        }

        .remove {
            opacity: 1;
        }
    }
}
</style>