<template>
    <AddNewArtist
        v-if="state.showAddArtist"
        @posted="handleAddArtist"
        @cancel="toggleAddArtist"
    />
    <AddNewVenue
        v-else-if="state.showAddVenue"
        @posted="handleSetVenue"
        @cancel="toggleAddVenue"
    />
    <EditVenue
        v-else-if="state.showEditVenue"
        :venue="state.venueToEdit"
        @posted="handleSetVenue"
        @cancel="toggleEditVenue"
    />
    <Form v-else class="EditShow ShowForm">
        <FormGroup>
            <FormControl
                label="show title"
                name="title"
                v-model="titleValue"
                :error="state.errors.title"
            />
        </FormGroup>
        <FormGroup>
            <FormControl
                label="add artist"
                name="artist"
                v-model="artistValue"
                :error="state.errors.artists"
            >
                <div class="dropdown">
                    <ul class="artists-dropdown">
                        <li
                            v-for="artist in store.artists.list.filter(
                                (artist) =>
                                    artist.name
                                        .toLowerCase()
                                        .includes(artistValue.toLowerCase())
                            )"
                            :key="artist._id"
                            class="artist-option"
                            @mousedown="() => handleAddArtist(artist)"
                        >
                            <Typography>{{ artist.name }}</Typography>
                        </li>
                        <li class="artist-option" @mousedown="toggleAddArtist">
                            <Typography>
                                <AwesomeIcon class="fas fa-plus" />
                                add new artist
                            </Typography>
                        </li>
                    </ul>
                </div>
            </FormControl>
            <ArtistList
                editable
                :artists="artistsValue"
                @remove-artist="handleRemoveArtist"
            />
        </FormGroup>
        <FormGroup>
            <FormControl
                label="show date"
                type="date"
                name="date"
                v-model="dateValue"
                :error="state.errors.date"
            />
        </FormGroup>
        <FormGroup>
            <FormControl
                label="venue"
                name="venue"
                v-model="searchValue"
                @focus="clearSearch"
                :error="state.errors.venue"
            >
                <div class="dropdown">
                    <ul class="venues-dropdown">
                        <li
                            v-for="venue in store.venues.list.filter((venue) =>
                                venue.name.includes(searchValue)
                            )"
                            :key="venue._id"
                            class="venue-option"
                            @mousedown="() => handleSetVenue(venue)"
                        >
                            <Typography>{{ venue.name }}</Typography>
                            <AwesomeIcon
                                icon="fa fa-edit"
                                title="edit venue"
                                @mousedown.stop="() => toggleEditVenue(venue)"
                            />
                        </li>
                        <li class="venue-option" @mousedown="toggleAddVenue">
                            <Typography>
                                <AwesomeIcon icon="fas fa-plus" />
                                add new venue
                            </Typography>
                        </li>
                    </ul>
                </div>
            </FormControl>
        </FormGroup>
        <FormGroup>
            <FormControl
                label="eventbrite link"
                name="link"
                v-model="linkValue"
                :error="state.errors.link"
            />
        </FormGroup>
        <FormGroup class="dropzone">
            <ManageImages
                v-if="state.chooseExisting"
                class="choose-existing-image"
                @select="handleSelectExisting"
                @deselect="handleDeselectExisting"
                :selected="state.selectedImages"
            />

            <FormControl
                v-else
                category="dropzone"
                label="add image(s)"
                v-model="imagesValue"
                @update:modelValue="filesChanged"
            />
        </FormGroup>
        <FormGroup class="choose-existing">
            <Typography @click="toggleChooseExisting">
                {{
                    state.chooseExisting
                        ? "upload image(s)"
                        : "choose existing image(s)"
                }}
            </Typography>
        </FormGroup>
        <FormGroup>
            <div class="existing-images">
                <div
                    v-for="image in show.images"
                    class="existing-image"
                    :key="image"
                >
                    <div
                        :class="{
                            'remove-image': true,
                            'confirm-remove': state.confirmRemove[image],
                        }"
                    >
                        <div
                            v-if="state.confirmRemove[image]"
                            class="confirm-remove-image"
                        >
                            <Typography>remove?</Typography>
                            <div class="buttons">
                                <Button
                                    @click.prevent="
                                        () => handleRemoveExistingImage(image)
                                    "
                                >
                                    <AwesomeIcon icon="fas fa-check" />
                                </Button>
                                <Button
                                    @click="() => deleteConfirmRemove(image)"
                                >
                                    <AwesomeIcon icon="fas fa-times" />
                                </Button>
                            </div>
                        </div>
                        <AwesomeIcon
                            v-else
                            icon="fas fa-trash"
                            @click="() => addConfirmRemove(image)"
                        />
                    </div>
                    <img
                        class="existing-image-thumbnail"
                        :src="`${BASE_URL}/api/images/${image}`"
                        alt=""
                    />
                </div>
            </div>
        </FormGroup>
        <FormGroup>
            <SaveCancel confirm @save="handleSave" @cancel="$emit('cancel')" />
        </FormGroup>
    </Form>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { default as isDate } from 'validator/lib/isDate'
import { default as isURL } from 'validator/lib/isURL'

import store from '../../store/store'
import { postShow, editShow } from '../../store/shows'
import { postImages, deleteImage } from '../../store/images'
import { storeAllArtists } from '../../store/artists'
import { storeAllVenues } from '../../store/venues'

import ArtistList from '../ArtistList.vue'
import AddNewArtist from './AddNewArtist.vue'
import AddNewVenue from './AddNewVenue.vue'
import EditVenue from './EditVenue.vue'
import ManageImages from './ManageImages.vue'

export default {
    name: 'EditShow',
    emits: ['add-new-artist', 'save', 'cancel'],
    components: {
        ArtistList,
        AddNewArtist,
        AddNewVenue,
        EditVenue,
        ManageImages
    },
    props: {
        isNew: Boolean,
        show: Object
    },
    async setup (props, { emit }) {
        const BASE_URL = process.env.VUE_APP_BACKEND_URI || 'http://localhost:5000'

        const initialErrors = {
            title: null,
            artists: null,
            date: null,
            venue: null,
            link: null,
        }

        const state = reactive({
            errors: initialErrors,
            showAddArtist: false,
            showEditArtist: false,
            showAddVenue: false,
            showEditVenue: false,
            venueToEdit: null,
            chooseExisting: false,
            selectedImages: {},
            confirmRemove: {},
            filesChanged: false,
        })

        const titleValue = ref(props.show.title)
        const artistValue = ref('')
        const artistsValue = ref(props.show.artists)
        const dateValue = ref(props.show.date)
        const venueValue = ref(props.show.venue)
        const linkValue = ref(props.show.link)
        const imagesValue = ref(props.show.images)
        const searchValue = ref(venueValue.value.name)

        const clearSearch = () => searchValue.value = ''

        const toggleAddArtist = () => state.showAddArtist = !state.showAddArtist
        const toggleEditArtist = () => state.showEditArtist = !state.showEditArtist
        const toggleAddVenue = () => state.showAddVenue = !state.showAddVenue
        const toggleEditVenue = (venue = null) => {
            state.venueToEdit = venue
            state.showEditVenue = !state.showEditVenue
        }
        const filesChanged = () => state.filesChanged = true

        const toggleChooseExisting = () => state.chooseExisting = !state.chooseExisting
        const handleSelectExisting = (image) => state.selectedImages[image] = image
        const handleDeselectExisting = (image) => delete state.selectedImages[image]

        const addConfirmRemove = (key) => state.confirmRemove[key] = key
        const deleteConfirmRemove = (key) => delete state.confirmRemove[key]
        const handleRemoveExistingImage = async (image) => {
            deleteConfirmRemove(image)
            const initialImages = imagesValue.value
            editShow(props.show._id, { ...props.show, images: imagesValue.value.filter((item) => item !== image) })

            const error = await deleteImage(image)

            if (error) {
                editShow(props.show._id, { ...props.show, images: initialImages })
            }
        }

        if (!store.artists.list.length) storeAllArtists()
        if (!store.venues.list.length) storeAllVenues()

        const handleRemoveArtist = (artistId) =>
            artistsValue.value = artistsValue.value.filter((artist) => artist._id !== artistId)

        const handleAddArtist = (artist) => {
            artistsValue.value = [...artistsValue.value, artist]
            state.showAddArtist = false
        }

        const handleSetVenue = (venue) => {
            venueValue.value = venue
            searchValue.value = venue.name
            state.showAddVenue = false
            state.showEditVenue = false
        }

        const handleSave = async () => {
            const errors = { ...initialErrors }
            state.errors = { ...errors }

            const {
                title, artists, date, venue, link
            } = {
                title: titleValue.value,
                artists: artistsValue.value,
                date: dateValue.value,
                venue: venueValue.value._id,
                link: linkValue.value,
            }

            if (!title) errors.title = 'title is required'
            if (!artists.length) errors.artists = 'must include at least one artist'
            if (date.length && !isDate(date)) errors.date = 'invalid date'
            if (!venue) errors.venue = 'venue is required'
            if (link.length && !isURL(link)) errors.link = 'invalid URL'

            if (Object.entries(errors).find(([key, value]) => value ? key : false))
                return state.errors = { ...errors }

            const images =
                state.filesChanged
                    ? await postImages(imagesValue.value)
                    : props.show.images

            const showObj = {
                title,
                artists,
                date,
                venue,
                link,
                images
            }

            if (props.isNew) await postShow(showObj)
            else await editShow(props.show._id, showObj)

            emit('save')
        }

        return {
            BASE_URL,
            store,
            state,
            clearSearch,
            toggleAddArtist,
            toggleEditArtist,
            toggleAddVenue,
            toggleEditVenue,
            filesChanged,
            toggleChooseExisting,
            handleSelectExisting,
            handleDeselectExisting,
            addConfirmRemove,
            deleteConfirmRemove,
            handleRemoveExistingImage,
            titleValue,
            artistValue,
            artistsValue,
            dateValue,
            venueValue,
            linkValue,
            imagesValue,
            searchValue,
            handleRemoveArtist,
            handleAddArtist,
            handleSetVenue,
            handleSave
        }
    }
}
</script>

<style lang="scss">
.ShowForm,
.EditVenue {
    margin: 0;
    width: 90%;

    .FormGroup .ArtistList {
        margin-top: 1em;
    }
}

.FormControl[for="artist"],
.FormControl[for="venue"],
.FormControl[for="location"] {
    position: relative;

    .dropdown {
        position: absolute;
        display: none;
        background: $accent-hover;
        bottom: -0.5em;
        transform: translate(-5%, 100%);
        width: 110%;
        z-index: 2;
        border-radius: 4px;
        overflow: hidden;
        box-shadow: 10px 10px 50px rgba($background, 0.3);
    }

    &:focus-within .dropdown {
        display: block;
    }

    .artists-dropdown,
    .venues-dropdown,
    .location-dropdown {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .artist-option,
    .venue-option,
    .location-option {
        color: $background;
        background: $color-main;
        margin-bottom: 2px;
        padding: 1em;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .fa-edit {
            font-size: 1.5em;

            &:hover {
                color: $accent-dark;
            }
        }

        &:last-of-type {
            margin-bottom: 0;
        }

        &:hover {
            background: $color-hover;
        }
    }
}

.FormGroup.choose-existing,
.FormGroup.dropzone {
    margin-bottom: 0.5em;
    padding: 0;
}

.FormGroup.choose-existing {
    .Typography {
        text-decoration: underline;
        cursor: pointer;

        @include hoverEffect;
    }
}

.existing-images {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
}

.existing-image {
    position: relative;
    flex: 0 1 23%;
    margin-right: 0.5em;

    .remove-image {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba($background, 0.8);
        align-items: center;
        justify-content: center;

        .confirm-remove-image {
            color: $color-main;
            text-align: center;
            width: 100%;
            padding: 0.6em;

            & > .Typography {
                font-size: 0.8rem;
                display: block;
                margin: 0 auto 0.5em;
            }

            .buttons {
                display: flex;
                width: 100%;
                justify-content: space-between;
            }

            .Button {
                font-size: 0.8rem;
                margin: 0;
                padding: 0.5em 0;
                flex: 0 1 47%;
            }
        }
    }

    @mixin visible {
        display: flex;

        .fa-trash {
            font-size: 2rem;
            cursor: pointer;
            @include hoverEffect;
        }
    }

    .remove-image.confirm-remove {
        @include visible;
    }

    &:hover {
        .remove-image {
            @include visible;
        }
    }
}

.existing-image-thumbnail {
    width: 100%;
}
</style>