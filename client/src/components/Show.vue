<template>
    <Card class="Show">
        <AdminTools
            v-if="token"
            @edit="() => setMode('edit')"
            @remove="() => setMode('remove')"
            @move="() => setMode('move')"
        />

        <Form v-if="mode === 'edit'" class="edit-content content">
            <FormSection v-if="addNewArtist">
                <Typography variant="h2" center :sx="{ marginBottom: '2em' }"
                    >add new artist</Typography
                >
                <FormGroup>
                    <FormControl
                        label="artist name"
                        name="newArtistName"
                        v-model="newArtistNameValue"
                        :error="errors.newArtistName"
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        label="social link"
                        name="newArtistLink"
                        v-model="newArtistLinkValue"
                        :error="errors.newArtistLink"
                    />
                </FormGroup>
                <FormGroup>
                    <SaveCancel
                        confirm
                        @save="handleAddNewArtist"
                        @cancel="toggleAddNewArtist"
                    />
                </FormGroup>
            </FormSection>
            <FormSection v-else-if="addNewVenue">
                <Typography variant="h2" center :sx="{ marginBottom: '2em' }"
                    >add new venue</Typography
                >
                <FormGroup>
                    <FormControl
                        label="venue name"
                        name="newVenueName"
                        v-model="newVenueNameValue"
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        label="venue location"
                        name="newVenueLocation"
                        v-model="newVenueLocationValue"
                    />
                </FormGroup>

                <FormGroup>
                    <SaveCancel
                        confirm
                        @save="handleAddNewVenue"
                        @cancel="toggleAddNewVenue"
                    />
                </FormGroup>
            </FormSection>
            <FormSection v-else>
                <FormGroup>
                    <FormControl
                        label="show title"
                        name="title"
                        v-model="titleValue"
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        label="add artist"
                        name="newArtist"
                        v-model="newArtistValue"
                    >
                        <div class="dropdown">
                            <ul class="artists-dropdown">
                                <li
                                    v-for="artist in artists.filter((artist) =>
                                        artist.name
                                            .toLowerCase()
                                            .includes(
                                                newArtistValue.toLowerCase()
                                            )
                                    )"
                                    :key="artist._id"
                                    class="artist-option"
                                    @mousedown="() => handleAddArtist(artist)"
                                >
                                    <Typography>{{ artist.name }}</Typography>
                                </li>
                                <li
                                    class="artist-option"
                                    @mousedown="toggleAddNewArtist"
                                >
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
                        :artists="showArtists"
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
                        v-model="venueValue"
                    >
                        <div class="dropdown">
                            <ul class="venues-dropdown">
                                <li
                                    v-for="venue in venues.filter((venue) =>
                                        venue.name
                                            .toLowerCase()
                                            .includes(venueValue.toLowerCase())
                                    )"
                                    :key="venue._id"
                                    class="venue-option"
                                    @mousedown="() => handleChangeVenue(venue)"
                                >
                                    <Typography>{{ venue.name }}</Typography>
                                </li>
                                <li
                                    class="venue-option"
                                    @mousedown="toggleAddNewVenue"
                                >
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
                    <SaveCancel
                        confirm
                        @save="handleSave"
                        @cancel="handleCancel"
                    />
                </FormGroup>
            </FormSection>
        </Form>

        <div v-else class="readonly-content content">
            <div class="card-top">
                <div class="show-info">
                    <Typography variant="h3" :sx="{ margin: '0 0 1em' }">
                        {{ show.title }}
                    </Typography>
                    <ArtistList :artists="showArtists" />
                </div>
            </div>
            <div v-if="showMap" class="map-container">
                <Typography bold>Google Maps is loading...</Typography>
                <iframe
                    class="map-frame"
                    style="border: 0"
                    loading="lazy"
                    theme="night"
                    allowfullscreen
                    :src="mapURL(show.venue.loc)"
                >
                </iframe>
            </div>
            <div class="card-bottom">
                <Typography variant="h4" :sx="{ margin: '0' }">
                    {{ dateValue }}
                </Typography>
                <Typography
                    color="accent"
                    variant="h4"
                    :sx="{ margin: '0 0.4em' }"
                    >@</Typography
                >
                <Typography
                    link
                    variant="h4"
                    :sx="{ margin: '0' }"
                    @click="() => toggleMap()"
                >
                    {{ show.venue.name }}
                    <AwesomeIcon
                        className="text-decoration"
                        icon="fa fa-map-marker"
                    />
                </Typography>
            </div>
        </div>
    </Card>
</template>

<script>
import { reactive, computed, ref } from 'vue'
import { isURL } from 'validator'

import store from '../store/store'
import { storeAllArtists, postArtist } from '../store/artists'
import { storeAllVenues, postVenue } from '../store/venues'
import ArtistList from './ArtistList.vue'
import { editShow, postShow } from '../store/shows'

export default {
    name: 'Show',
    props: {
        show: Object,
        new: {
            type: Boolean,
            default: false,
        }
    },
    components: {
        ArtistList,
    },
    setup (props) {
        // const formatDate = (date = new Date()) =>
        //     `${date.getFullYear()}-${(
        //         date.getMonth() + 1)
        //         .toString()
        //         .padStart(2, '0')}-${date.getDate()
        //             .toString()
        //             .padStart(2, '0')
        //     }`

        const token = store.user.token
        const mapsApiKey = process.env.VUE_APP_MAPS_KEY

        const initialErrors = {
            title: '',
            artists: '',
        }

        const state = reactive({
            showMap: false,
            mode: props.mode,
            errors: initialErrors,
            title: props.show ? props.show.title : '',
            addNewArtist: false,
            addNewVenue: false,
            artists: props.show ? props.show.artists : [],
            date: props.show ? props.show.date : '',
            venue: props.show ? props.show.venue : {}
        })

        const titleValue = ref(state.title)
        const newArtistValue = ref('')
        const newArtistNameValue = ref('')
        const newArtistLinkValue = ref('')
        const dateValue = ref(state.date)
        const venueValue = ref(state.venue.name)
        const newVenueNameValue = ref('')
        const newVenueLocationValue = ref('')

        const toggleMap = () => state.showMap = !state.showMap
        const showMap = computed(() => state.showMap)
        const addNewArtist = computed(() => state.addNewArtist)
        const addNewVenue = computed(() => state.addNewVenue)
        const errors = computed(() => state.errors)

        const mapURL = (loc) =>
            `https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${loc}`

        const setMode = async (mode) => {
            state.mode = mode
            if (mode === 'edit') {
                if (!store.artists.list.length) await storeAllArtists()
                if (!store.venues.list.length) await storeAllVenues()
            }
        }

        const toggleAddNewArtist = () => state.addNewArtist = !state.addNewArtist
        const toggleAddNewVenue = () => state.addNewVenue = !state.addNewVenue

        const mode = computed(() => state.mode)
        const artists = computed(() => store.artists.list)
        const venues = computed(() => store.venues.list)
        const showArtists = computed(() => state.artists)

        const handleRemoveArtist = (artistId) => {
            state.artists = state.artists.filter((artist) => artist._id !== artistId)
        }

        const handleAddArtist = (artist) => {
            state.artists = [...state.artists, artist]
        }

        const handleAddNewArtist = async () => {
            try {
                const errors = {}

                if (!newArtistNameValue.value) errors.newArtistName = 'artist name is required'
                if (newArtistLinkValue.value && !isURL(newArtistLinkValue.value)) errors.newArtistLink = 'must be a valid URL'

                if (Object.entries(errors).length) throw errors

                const newArtist = await postArtist({
                    name: newArtistNameValue.value,
                    link: newArtistLinkValue.value
                })

                if (!newArtist) throw { postArtist: 'not authorized' }

                state.artists = [...state.artists, newArtist]

                state.errors = { ...state.errors, newArtistName: '', newArtistLink: '' }

                toggleAddNewArtist()
            } catch (err) {
                state.errors = { ...state.errors, ...err }
            }
        }

        const handleChangeVenue = (venue) => {
            state.venue = venue
            venueValue.value = venue.name
        }

        const handleAddNewVenue = async () => {
            try {
                const errors = {}

                if (!newVenueNameValue.value) errors.newVenueName = 'venue name is required'
                if (!newVenueLocationValue.value) errors.newVenueLocation = 'venue name is required'

                if (Object.entries(errors).length) throw errors

                const newVenue = await postVenue({
                    name: newVenueNameValue.value,
                    loc: newVenueLocationValue.value
                })

                if (!newVenue) throw { postArtist: 'not authorized' }

                state.venue = newVenue

                state.errors = { ...state.errors, newVenueName: '', newVenueLocation: '' }

                toggleAddNewVenue()
            } catch (err) {
                state.errors = { ...state.errors, ...err }
            }
        }

        const handleCancel = () => {
            state.title = props.show.title
            state.date = props.show.date
            state.venue = props.show.venue
            state.artists = props.show.artists

            newArtistValue.value = ''
            newVenueNameValue.value = ''
            newVenueLocationValue.value = ''

            setMode(null)
        }

        const handleSave = async () => {
            try {
                const errors = {}

                if (!titleValue.value) errors.title = 'title cannot be empty'
                if (!state.artists.length) errors.artists = 'must include at least one artist'

                if (Object.entries(errors).length) throw errors

                console.log(dateValue.value)

                const req = {
                    title: titleValue.value,
                    artists: state.artists.map((artist) => artist._id),
                    venue: venues.value.find((venue) => venue.name === venueValue.value)._id,
                    date: dateValue.value,
                }

                if (props.new) {
                    await postShow(req)
                } else {
                    await editShow(props.show._id, req)
                }

                setMode(null)
            } catch (err) {
                state.errors = { ...state.errors, ...err }
            }

        }

        return {
            token,
            state,
            errors,
            toggleMap,
            showMap,
            mapURL,
            mode,
            titleValue,
            newArtistValue,
            newArtistNameValue,
            newArtistLinkValue,
            dateValue,
            venueValue,
            newVenueNameValue,
            newVenueLocationValue,
            handleRemoveArtist,
            handleAddArtist,
            handleAddNewArtist,
            handleChangeVenue,
            handleAddNewVenue,
            setMode,
            toggleAddNewArtist,
            addNewArtist,
            toggleAddNewVenue,
            addNewVenue,
            handleCancel,
            handleSave,
            artists,
            venues,
            showArtists
        }
    }
}
</script>

<style lang="scss">
.Show.Card {
    position: relative;

    max-width: 750px;
    margin: 0 auto;
    padding: 3em;

    .content {
        min-height: 25em;
    }

    .edit-content {
        margin: 0;
        width: 80%;
    }

    .readonly-content {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .card-top,
    .card-bottom {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    .map-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 70%;
        background: $background-light;
        z-index: 1;

        .Typography {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: -1;
        }
    }

    .map-frame {
        display: block;
        width: 100%;
        height: 100%;
        z-index: 0;
    }

    .text-decoration {
        margin-left: 0.3em;
    }

    .FormGroup .ArtistList {
        margin-top: 1em;
    }

    .FormControl[for="newArtist"],
    .FormControl[for="venue"] {
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
        .venues-dropdown {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .artist-option,
        .venue-option {
            color: $background;
            background: $color-main;
            margin-bottom: 2px;
            padding: 1em;
            z-index: 2;

            &:last-of-type {
                margin-bottom: 0;
            }

            &:hover {
                background: $color-hover;
            }
        }
    }
}
</style>