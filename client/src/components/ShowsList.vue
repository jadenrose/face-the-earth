<template>
    <section class="ShowsList">
        <Card class="Show" v-for="show in shows" :key="show._id">
            <div class="card-top">
                <div class="show-info">
                    <Typography variant="h3" :sx="{ margin: '0 0 1em' }">
                        {{ show.title }}
                    </Typography>
                    <ul class="artist-list">
                        <li
                            class="artist"
                            v-for="artist in show.artists"
                            :key="artist._id"
                        >
                            <a
                                class="artist-link"
                                :href="artist.link"
                                target="_blank"
                            >
                                <Typography small>{{ artist.name }}</Typography>
                            </a>
                        </li>
                    </ul>
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
        </Card>
    </section>
</template>

<script>
import { reactive, computed } from 'vue'

import { storeAllShows } from '../store/shows'
import store from '../store/store'

export default {
    name: 'ShowsList',
    async setup () {
        await storeAllShows()

        const mapsApiKey = process.env.VUE_APP_MAPS_KEY

        const localState = reactive({
            showMap: false
        })

        const toggleMap = () => {
            localState.showMap = !localState.showMap
        }

        const shows = computed(() => store.shows.list)
        const showMap = computed(() => localState.showMap)

        const mapURL = (loc) =>
            `https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${loc}`


        return {
            shows,
            toggleMap,
            showMap,
            mapURL

        }
    },
}
</script>

<style lang="scss">
.ShowsList {
    .Card {
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-width: 750px;
        min-height: 25em;
        margin: 0 auto;
        padding: 3em;
    }

    .artist-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
    }

    .artist {
        margin-right: 1.6em;
    }

    .artist-link {
        background: $accent-main;
        color: $background;
        padding: 0.7em 1em;
        border-radius: 15em;
        font-weight: $bold;

        &:hover {
            background: $accent-hover;

            .Typography {
                color: $background;
            }
        }
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
}
</style>