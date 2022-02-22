<template>
    <Card
        :class="{
            Show: true,
            editing: state.mode === 'edit',
        }"
    >
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
                    <Typography variant="h5">
                        {{ show.title }}
                    </Typography>
                    <ArtistList :artists="show.artists" />
                </div>
            </div>

            <div class="card-bottom">
                <div class="show-date">
                    <Typography variant="h5">
                        {{ showMonth }}
                    </Typography>
                    <Typography variant="h5">
                        {{ showDay }}
                    </Typography>
                </div>
                <div class="venue-info">
                    <a
                        :href="
                            encodeURI(
                                `https://www.google.com/maps/search/?api=1&query=${show.venue.locationAddress}&query_place_id=${show.venue.placeId}`
                            )
                        "
                        target="_blank"
                        class="map-link"
                    >
                        <Typography link variant="h6">
                            {{ show.venue.name }}
                            <AwesomeIcon
                                className="text-decoration"
                                icon="fa fa-map-marker"
                            />
                        </Typography>
                    </a>
                    <a
                        v-if="canBuyTickets"
                        class="buy-tickets"
                        :href="show.link"
                        target="_blank"
                    >
                        tickets
                    </a>
                </div>
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
import { computed } from 'vue'

import store from '../store/store'
import { removeShow } from '../store/shows'

import EditShow from './forms/EditShow.vue'
import ArtistList from './ArtistList.vue'
import { onMounted, onUnmounted } from '@vue/runtime-core'
import isURL from 'validator/lib/isURL'
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
                link: '',
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

        const monthNames = [
            'jan',
            'feb',
            'mar',
            'apr',
            'may',
            'jun',
            'jul',
            'aug',
            'sep',
            'oct',
            'nov',
            'dec',
        ]

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

        const BASE_URL = process.env.VUE_APP_BACKEND_URI || 'http://localhost:5000'

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

        const showMonth = monthNames[props.show.dateObj.getMonth()]
        const showDay = props.show.dateObj.getDate()

        const canBuyTickets =
            computed(() => {
                if (new Date() > props.show.dateObj) return false

                if (!props.show?.link?.length) return false

                return isURL(props.show?.link)
            })

        return {
            BASE_URL,
            store,
            state,
            showMonth,
            showDay,
            canBuyTickets,
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
    // padding: 2em;
    align-self: stretch;
    text-align: left;
    flex-grow: 0;
    flex-shrink: 1;
    height: 250px;

    &.editing {
        position: fixed;
        z-index: 999;
        top: 4em;
        left: 4em;
        height: unset;
        padding: 2em;
        overflow: visible;

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

    width: 80vw;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;

    @include tablet {
        flex-basis: 48%;
        margin-left: unset;
        margin-right: unset;
        max-width: unset;
    }

    // @include desktop {
    //     flex-basis: 31%;
    // }

    .content {
        height: 100%;
    }

    .readonly-content {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        z-index: 2;
    }

    .Typography {
        margin: 0;
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
        align-items: center;
    }

    .show-info {
        padding: 1em;
    }

    .card-bottom {
        background: $color-main;
        color: $background;
    }

    .show-date {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: $accent-main;
        text-align: center;
        padding: 0.5em 1em;
        align-self: stretch;
        margin-right: 1em;
    }

    .venue-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        width: 100%;

        .buy-tickets {
            display: flex;
            align-items: center;
            cursor: pointer;
            background: $accent-main;
            border-radius: 2px;
            align-self: stretch;
            padding: 0 1.3em;
            text-transform: uppercase;
            font-weight: $bold;

            &:hover {
                background: $accent-hover;
            }
        }
    }

    .map-link {
        display: flex;
        align-items: center;
        flex: 1 1 60%;
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