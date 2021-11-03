<template>
    <Card class="Show">
        <AdminTools
            v-if="token"
            @edit="() => setMode('edit')"
            @remove="() => setMode('remove')"
            @move="() => setMode('move')"
        />

        <Form v-if="mode === 'edit'" class="edit-content content">
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
                                        .includes(newArtistValue.toLowerCase())
                                )"
                                :key="artist._id"
                                class="artist-option"
                                @mousedown="() => handleAdd(artist)"
                            >
                                <Typography>{{ artist.name }}</Typography>
                            </li>
                        </ul>
                    </div>
                </FormControl>
                <ArtistList
                    editable
                    :artists="showArtists"
                    @remove-artist="handleRemove"
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
                    category="select"
                    :options="
                        venues.map((venue) => ({
                            label: venue.name,
                            value: venue._id,
                        }))
                    "
                    name="venue"
                    v-model="venueValue"
                />
            </FormGroup>
            <FormGroup v-if="venueValue === 'other'">
                <FormControl
                    label="venue name"
                    name="venueName"
                    v-model="venueNameValue"
                />
            </FormGroup>
            <FormGroup v-if="venueValue === 'other'">
                <FormControl
                    label="venue location"
                    name="venueLocation"
                    v-model="venueLocationValue"
                />
            </FormGroup>
            <FormGroup>
                <SaveCancel confirm @cancel="handleCancel" />
            </FormGroup>
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
                    {{ new Date(show.date).toDateString() }}
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

import store from '../store/store'
import { storeAllArtists } from '../store/artists'
import { storeAllVenues } from '../store/venues'
import ArtistList from './ArtistList.vue'
import { postShow } from '../store/shows'

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
        const formatDate = (date = new Date()) =>
            `${date.getFullYear()}-${(
                date.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${date.getDate()
                    .toString()
                    .padStart(2, '0')
            }`

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
            artists: props.show ? props.show.artists : [],
            date: props.show ? formatDate(new Date(props.show.date)) : '',
            venue: props.show ? props.show.venue._id : {}
        })

        const titleValue = ref(state.title)
        const newArtistValue = ref('')
        const dateValue = ref(state.date)
        const venueValue = ref(state.venue)
        const venueNameValue = ref('')
        const venueLocationValue = ref('')

        const toggleMap = () => state.showMap = !state.showMap
        const showMap = computed(() => state.showMap)

        const mapURL = (loc) =>
            `https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${loc}`

        const setMode = async (mode) => {
            state.mode = mode
            if (mode === 'edit') {
                if (!store.artists.list.length) await storeAllArtists()
                if (!store.venues.list.length) await storeAllVenues()
            }
        }

        const mode = computed(() => state.mode)
        const artists = computed(() => store.artists.list)
        const venues = computed(() => store.venues.list)
        const showArtists = computed(() => state.artists)

        const handleRemove = (artistId) => {
            state.artists = state.artists.filter((artist) => artist._id !== artistId)
        }

        const handleAdd = (artist) => {
            state.artists = [...state.artists, artist]
        }

        const handleCancel = () => {
            state.title = props.show.title
            state.date = props.show.date
            state.venue = props.show.venue
            state.artists = props.show.artists

            newArtistValue.value = ''
            venueNameValue.value = ''
            venueLocationValue.value = ''

            setMode(null)
        }

        const handleSave = async () => {
            try {
                const errors = {}

                if (!titleValue.value) errors.title = 'title cannot be empty'
                if (!state.artists.length) errors.artists = 'must include at least one artist'

                if (Object.entries(errors).length) throw errors

                if (props.new) {
                    await postShow({
                        title: titleValue.value,
                        artists: state.artists.map((artist) => artist._id),
                        date: state.date,
                    })
                }

            } catch (err) {
                console.log(err)
                state.errors = { ...state.errors, ...err }
            }

        }

        return {
            token,
            state,
            toggleMap,
            showMap,
            mapURL,
            mode,
            titleValue,
            newArtistValue,
            dateValue,
            venueValue,
            venueNameValue,
            venueLocationValue,
            handleRemove,
            handleAdd,
            setMode,
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

    .FormControl[for="newArtist"] {
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

        .artists-dropdown {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .artist-option {
            color: $background;
            background: $color-main;
            margin-bottom: 1px;
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