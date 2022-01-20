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
            <FormControl label="show title" name="title" v-model="titleValue" />
        </FormGroup>
        <FormGroup>
            <FormControl label="add artist" name="artist" v-model="artistValue">
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
            />
        </FormGroup>
        <FormGroup>
            <FormControl
                label="venue"
                name="venue"
                v-model="searchValue"
                @focus="clearSearch"
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
                category="dropzone"
                label="add image(s)"
                v-model="imagesValue"
                @update:modelValue="filesChanged"
            />
        </FormGroup>
        <FormGroup>
            <SaveCancel confirm @save="handleSave" @cancel="$emit('cancel')" />
        </FormGroup>
    </Form>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { isDate } from 'validator'

import store from '../../store/store'
import { postShow, editShow } from '../../store/shows'
import { postImages } from '../../store/images'
import { storeAllArtists } from '../../store/artists'
import { storeAllVenues } from '../../store/venues'

import ArtistList from '../ArtistList.vue'
import AddNewArtist from './AddNewArtist.vue'
import AddNewVenue from './AddNewVenue.vue'
import EditVenue from './EditVenue.vue'

export default {
    name: 'EditShow',
    emits: ['add-new-artist', 'save', 'cancel'],
    components: {
        ArtistList,
        AddNewArtist,
        AddNewVenue,
        EditVenue,
    },
    props: {
        isNew: Boolean,
        show: Object
    },
    async setup (props, { emit }) {
        const initialErrors = {
            title: null,
            artists: null,
            date: null,
            venue: null
        }

        const state = reactive({
            errors: initialErrors,
            showAddArtist: false,
            showEditArtist: false,
            showAddVenue: false,
            showEditVenue: false,
            venueToEdit: null,
            filesChanged: false,
        })

        const titleValue = ref(props.show.title)
        const artistValue = ref('')
        const artistsValue = ref(props.show.artists)
        const dateValue = ref(props.show.date)
        const venueValue = ref(props.show.venue)
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
            const errors = initialErrors

            const {
                title, artists, date, venue
            } = {
                title: titleValue.value,
                artists: artistsValue.value,
                date: dateValue.value,
                venue: venueValue.value._id
            }

            if (!title) errors.title = 'title is required'
            if (!artists.length) errors.artists = 'must include at least one artist'
            if (!date) errors.date = 'date is required'
            if (!isDate(date)) errors.date = 'invalid date'
            if (!venue) errors.venue = 'venue is required'

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
                images
            }

            if (props.isNew) await postShow(showObj)
            else await editShow(props.show._id, showObj)

            emit('save')
        }

        return {
            store,
            state,
            clearSearch,
            toggleAddArtist,
            toggleEditArtist,
            toggleAddVenue,
            toggleEditVenue,
            filesChanged,
            titleValue,
            artistValue,
            artistsValue,
            dateValue,
            venueValue,
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
    width: 80%;

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
</style>