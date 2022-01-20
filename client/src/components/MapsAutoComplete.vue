<template>
    <div class="MapsAutoComplete dropdown">
        <ul class="location-dropdown">
            <li
                v-for="place in places"
                :key="place.place_id"
                @mousedown="$emit('mousedown', place)"
                class="location-option"
            >
                <span class="place-name">{{ place.name }}</span>
                <span class="place-address">{{ place.formatted_address }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { searchPlaces } from '../store/venues'

export default {
    name: 'MapsAutoComplete',
    emits: ['mousedown'],
    props: {
        query: String,
    },
    setup (props) {
        const state = reactive({
            places: [],
            lastQuery: ''
        })

        const search = async () => {
            if (props.query && props.query !== state.lastQuery) {
                state.places = await searchPlaces(props.query)
                state.lastQuery = props.query
            }
        }
        const places = computed(() => state.places)

        const timer = setInterval(search, 1000)

        return {
            search,
            places,
            timer
        }
    },
    beforeUnmount () {
        clearInterval(this.timer)
    },
}
</script>

<style lang="scss">
.place-address {
    font-size: 80%;
    font-weight: $normal;
    opacity: 0.5;
    text-align: right;
}
</style>