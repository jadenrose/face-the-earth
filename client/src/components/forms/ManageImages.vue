<template>
    <div class="ManageImages">
        <div
            v-for="image in state.images"
            :key="image"
            :class="{
                'existing-image-wrapper': true,
                'show-expanded': state.showExpanded[image],
                'show-confirm': state.showConfirm[image],
            }"
        >
            <div class="manage-image">
                <div v-if="state.showConfirm[image]" class="confirm-remove">
                    <Typography>
                        Permanently remove image from database?
                    </Typography>
                    <div class="buttons">
                        <Button @click.prevent="() => handleDelete(image)">
                            <AwesomeIcon icon="fas fa-check" />
                        </Button>
                        <Button @click.prevent="() => handleHideConfirm(image)">
                            <AwesomeIcon icon="fas fa-times" />
                        </Button>
                    </div>
                </div>
                <div
                    v-else-if="state.showExpanded[image]"
                    class="expanded-view"
                >
                    <div class="buttons">
                        <Button
                            @click.prevent="() => handleHideExpanded(image)"
                        >
                            <AwesomeIcon icon="fas fa-arrow-left" />
                        </Button>
                    </div>
                </div>
                <div v-else class="buttons">
                    <Button
                        v-if="selected.includes(image)"
                        @click.prevent="() => handleDeselect(image)"
                    >
                        <AwesomeIcon icon="fas fa-minus" />
                    </Button>
                    <Button v-else @click.prevent="() => handleSelect(image)">
                        <AwesomeIcon icon="fas fa-plus" />
                    </Button>
                    <Button @click.prevent="() => handleShowExpanded(image)">
                        <AwesomeIcon icon="fas fa-eye" />
                    </Button>
                    <Button @click.prevent="() => handleShowConfirm(image)">
                        <AwesomeIcon icon="fas fa-trash" />
                    </Button>
                </div>
            </div>
            <img :src="`${BASE_URL}/api/images/${image}`" alt="" />
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'

import store from '../../store/store'
import { storeAllImages, deleteImage } from '../../store/images'

export default {
    name: 'ManageImages',
    props: {
        selected: {
            type: Object,
            default: () => ({})
        }
    },
    async setup (props, { emit }) {
        const BASE_URL = process.env.VUE_APP_BACKEND_URI || 'http://localhost:5000'

        const state = reactive({
            showExpanded: {},
            showConfirm: {},
            images: []
        })

        if (!store.images.list.length) await storeAllImages()

        state.images = store.images.list

        const handleSelect = (key) => emit('select', key)
        const handleDeselect = (key) => emit('deselect', key)

        const handleShowExpanded = (key) => state.showExpanded[key] = key
        const handleHideExpanded = (key) => delete state.showExpanded[key]

        const handleShowConfirm = (key) => state.showConfirm[key] = key
        const handleHideConfirm = (key) => delete state.showConfirm[key]


        const handleDelete = async (image) => {
            handleHideConfirm(image)
            const initialImages = [...state.images]

            state.images = state.images.filter((img) => img !== image)

            const error = await deleteImage(image)

            if (error) state.images = initialImages
        }

        return {
            BASE_URL,
            state,
            handleSelect,
            handleDeselect,
            handleShowExpanded,
            handleHideExpanded,
            handleShowConfirm,
            handleHideConfirm,
            handleDelete,
        }
    }
}
</script>

<style lang="scss">
.ManageImages {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;

    .existing-image-wrapper {
        position: relative;
        flex: 0 1 23%;
        align-self: stretch;
        margin-right: 0.5em;

        &.show-expanded,
        &.show-confirm {
            flex-basis: 100%;
        }

        &:hover,
        &.show-confirm {
            .manage-image {
                display: flex;
            }
        }
    }

    .manage-image {
        display: none;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba($background, 0.8);

        &.show-confirm {
            display: flex;
        }

        .confirm-remove,
        .expanded-view {
            .Typography {
                color: $color-main;
                margin: 0;
            }

            .buttons {
                padding: 0.5em;
                justify-content: center;
                width: 100%;
                display: flex;

                .Button {
                    background: $accent-main;
                    padding: 0.8em 1.4em;
                    margin-right: 1em;

                    &:hover {
                        background: $accent-hover;
                    }

                    .Typography {
                        color: $background;
                    }
                }
            }
        }
    }

    img {
        width: 100%;
    }

    .buttons {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        padding: 0.5em;
        justify-content: space-between;
    }

    .Button {
        flex: 0 1 30%;
        display: block;
        margin: 0;
        padding: 0.4em;
    }
}
</style>