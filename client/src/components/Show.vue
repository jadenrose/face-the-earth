<template>
    <Card class="Show">
        <AdminTools
            v-if="store.user.token"
            @edit="() => setMode('edit')"
            @remove="() => setMode('remove')"
            @move="() => setMode('move')"
            edit
            remove
            :mode="state.mode"
        />

        <EditShow
            v-if="state.mode === 'edit'"
            :isNew="isNew"
            :show="show"
            @save="handleSave"
            @cancel="handleCancel"
        />

        <div
            v-else-if="store.user.token && state.mode === 'remove'"
            class="remove-content"
        >
            <div class="confirm-remove">
                <Typography variant="h2">Really remove this show?</Typography>
                <div class="button-wrapper">
                    <Button big @click="handleRemove" label="yes" />
                    <Button big @click="() => setMode(null)" label="no" />
                </div>
            </div>
        </div>

        <div v-else class="readonly-content content">
            <div class="card-top">
                <div class="show-info">
                    <Typography variant="h3" :sx="{ margin: '0 0 1em' }">
                        {{ show.title }}
                    </Typography>
                    <ArtistList :artists="show.artists" />
                </div>
            </div>

            <div class="card-bottom">
                <Typography variant="h4" :sx="{ margin: '0' }">
                    {{ show.date }}
                </Typography>
                <Typography
                    color="accent"
                    variant="h4"
                    :sx="{ margin: '0 0.4em' }"
                    >@</Typography
                >
                <a
                    :href="
                        encodeURI(
                            `https://www.google.com/maps/search/?api=1&query=${show.venue.locationAddress}&query_place_id=${show.venue.placeId}`
                        )
                    "
                    target="_blank"
                >
                    <Typography link variant="h4" :sx="{ margin: '0' }">
                        {{ show.venue.name }}
                        <AwesomeIcon
                            className="text-decoration"
                            icon="fa fa-map-marker"
                        />
                    </Typography>
                </a>
            </div>
            <div v-if="state.currentImage" class="image-container">
                <img
                    :src="`${BASE_URL}/api/images/${state.currentImage}`"
                    alt="image here"
                />
            </div>
        </div>
    </Card>
</template>

<script>
import { reactive } from '@vue/reactivity'

import store from '../store/store'
import { removeShow } from '../store/shows'

import EditShow from './forms/EditShow.vue'
import ArtistList from './ArtistList.vue'
import { onMounted, onUnmounted } from '@vue/runtime-core'

export default {
    name: 'Show',
    props: {
        show: {
            type: Object,
            default: () => ({
                title: '',
                artists: [],
                date: '',
                venue: {
                    _id: '',
                    name: '',
                    locationName: '',
                    locationAddress: '',
                    placeId: '',
                },
                images: [],
            })
        },
        isNew: {
            type: Boolean,
            default: false,
        },
        mode: {
            type: String,
            default: null,
        }
    },
    components: {
        EditShow,
        ArtistList,
    },
    setup (props, { emit }) {
        const state = reactive({
            mode: props.mode,
            showMap: false,
            imageTimer: null,
            currentImageIndex: 0,
            currentImage: props.show.images[0]
        })

        onMounted(() => {
            if (!state.imageTimer) setInterval(() => {
                if (state.currentImageIndex === props.show.images.length - 1)
                    state.currentImageIndex = 0
                else state.currentImageIndex++

                state.currentImage = props.show.images[state.currentImageIndex]
            }, 10e3)
        })

        onUnmounted(() => {
            if (state.imageTimer) {
                clearInterval(state.imageTimer)
                state.imageTimer = null
            }
        })

        const BASE_URL = process.env.BACKEND_URI || 'http://localhost:5000'

        const toggleShowMap = () => state.showMap = !state.showMap
        const setMode = (mode) => state.mode = mode

        const handleSave = () => {
            setMode(null)
            emit('posted')
        }

        const handleCancel = () => {
            setMode(null)
            emit('cancel')
        }

        const handleRemove = async () => {
            await removeShow(props.show._id)

            setMode(null)
        }

        return {
            BASE_URL,
            store,
            state,
            toggleShowMap,
            setMode,
            handleSave,
            handleCancel,
            handleRemove,
        }
    }
}
</script>

<style lang="scss">
.Show.Card {
    position: relative;
    overflow: hidden;
    z-index: 0;
    margin-bottom: 4em;

    max-width: 750px;
    margin-left: auto;
    margin-right: auto;
    padding: 3em;

    text-align: left;

    .content {
        min-height: 20em;

        @include tablet {
            min-height: 25em;
        }
    }

    .readonly-content {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        z-index: 2;
    }

    .image-container {
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;

        img {
            object-position: center;
            opacity: 0.2;
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
    }

    .card-top,
    .card-bottom {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    .text-decoration {
        margin-left: 0.3em;
    }

    .remove-content,
    .move-content {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 400px;
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