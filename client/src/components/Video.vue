<template>
    <Card class="Video">
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

        <div v-else class="readonly-content">
            <div class="loading-text">
                <Typography center>loading video...</Typography>
            </div>
            <div class="VideoBody">
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
    margin: 0 auto $spacing-med;
    width: 100%;
    max-width: 800px;
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

    .VideoBody {
        height: 50vw;
        max-height: 35em;
    }

    .youtube-embed {
        display: block;
        border-radius: 6px;
        z-index: 2;
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
        border-radius: 8px;
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