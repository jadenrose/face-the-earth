<template>
    <Card
        :class="{
            Video: true,
            editing: state.mode === 'edit',
        }"
    >
        <AdminTools
            @edit="() => setMode('edit')"
            @remove="() => setMode('remove')"
            @move="() => setMode('move')"
            edit
            remove
            move
        />

        <EditVideo
            :isNew="isNew"
            v-if="store.user.token && state.mode === 'edit'"
            :video="video"
            @save="handleSave"
            @cancel="handleCancel"
        />

        <div
            v-else-if="store.user.token && state.mode === 'remove'"
            class="remove-content"
        >
            <div class="confirm-remove">
                <Typography variant="h2">Really remove this video?</Typography>
                <div class="button-wrapper">
                    <Button big @click="handleRemove" label="yes" />
                    <Button big @click="() => setMode(null)" label="no" />
                </div>
            </div>
        </div>

        <div
            v-else-if="store.user.token && state.mode === 'move'"
            class="move-content"
        >
            <div
                v-if="video.displayPosition > 0"
                class="move-button"
                @click="moveUp"
            >
                <i class="fas fa-arrow-up" />
            </div>
            <div
                v-if="video.displayPosition < lastIndex"
                class="move-button"
                @click="moveDown"
            >
                <i class="fas fa-arrow-down" />
            </div>
            <div class="move-button" @click="() => setMode(null)">
                <Typography small bold>cancel</Typography>
            </div>
        </div>

        <div v-else class="content readonly-content">
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
        </div>
    </Card>
</template>

<script>
import { reactive, computed } from 'vue'

import store from '../store/store'
import { removeVideo, moveVideo } from '../store/videos'

import EditVideo from './forms/EditVideo.vue'

export default {
    name: 'Video',
    emits: ['posted', 'cancel'],
    props: {
        isNew: {
            type: Boolean,
            default: false
        },
        mode: String,
        video: {
            type: Object,
            default: () => ({
                _id: '',
                title: '',
                desc: '',
                url: ''
            })
        }
    },
    components: {
        EditVideo
    },
    setup (props, { emit }) {
        const state = reactive({
            mode: props.mode
        })

        const setMode = (mode) =>
            state.mode = mode

        const lastIndex = computed(() => store.videos.list.length - 1)

        const handleRemove = async () => {
            await removeVideo(props.video._id)

            setMode(null)
        }

        const moveUp = () => {
            moveVideo(props.video.displayPosition, -1)

            setMode(null)
        }

        const moveDown = () => {
            moveVideo(props.video.displayPosition, 1)

            setMode(null)
        }

        const handleSave = () => {
            setMode(null)
            emit('posted')
        }

        const handleCancel = () => {
            setMode(null)
            emit('cancel')
        }

        return {
            store,
            state,
            lastIndex,
            setMode,
            handleRemove,
            moveUp,
            moveDown,
            handleSave,
            handleCancel
        }
    }
}
</script>

<style lang="scss">
.Video {
    $width-mobile: 70;
    $width-tablet: 40;
    $width-desktop: 28;

    min-width: 0;
    position: relative;
    z-index: 0;
    width: #{$width-mobile}vw;
    height: #{math.div($width-mobile * 9, 16)}vw;
    max-width: 380px;
    max-height: #{math.div(380 * 9, 16)}px;
    margin-bottom: 1em;
    margin-left: auto;
    margin-right: auto;

    &.editing {
        position: fixed;
        z-index: 999;
        top: 4em;
        left: 4em;
        height: unset;
        padding: 2em;
        overflow: visible;
        width: 70vw;

        &:after {
            transform: unset;
            content: "";
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: -1;
            background: rgba($background, 0.8);
        }
    }

    @include tablet {
        width: #{$width-tablet}vw;
        height: #{math.div($width-tablet * 9, 16)}vw;
        margin-left: 0;
        margin-right: 1em;
    }

    @include desktop {
        width: #{$width-desktop}vw;
        height: #{math.div($width-desktop * 9, 16)}vw;
    }

    .content,
    .youtube-embed {
        display: block;
        width: 100%;
        height: 100%;
    }

    .remove-content,
    .move-content {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 350px;
        width: 80%;
    }

    .move-content {
        justify-content: left;
    }

    .remove-content {
        background: $danger;
        .h2 {
            margin-bottom: 1em;
        }
    }

    .move-content {
        font-size: 2em;

        .fas {
            font-size: 2em;
        }
    }

    .move-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: $accent-main;
        color: $background;
        padding: 1em;
        margin: 1em;
        border-radius: 50%;
        width: 4em;
        height: 4em;
        cursor: pointer;

        &:hover {
            background: $accent-hover;
        }
    }

    .confirm-remove {
        color: $background;
        text-align: center;

        .button-wrapper {
            display: flex;
            justify-content: space-between;
            margin: 0;
            padding: 0;
        }

        .Button {
            background: $background;
            color: $color-main;
            display: block;

            &:hover {
                background: $background-light;
            }
        }
    }
}
</style>