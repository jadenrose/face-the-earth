<template>
    <ul class="ArtistList">
        <li
            class="artist-list-item"
            v-for="artist in artists"
            :key="artist._id"
        >
            <Artist
                :artist="artist"
                :editable="editable"
                @remove-me="removeArtist"
            />
        </li>
    </ul>
</template>

<script>
import Artist from './Artist.vue'

export default {
    name: 'ArtistList',
    props: {
        artists: {
            type: Array,
            default: () => [],
        },
        editable: {
            type: Boolean,
            default: false,
        }
    },
    components: {
        Artist
    },
    setup (_, { emit }) {
        const removeArtist = (artistId) => emit('remove-artist', artistId)

        return {
            removeArtist
        }
    }
}
</script>

<style lang="scss">
.ArtistList {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;

    .artist-list-item {
        margin-right: 1em;

        &:last-child {
            margin-right: 0;
        }
    }
}
</style>