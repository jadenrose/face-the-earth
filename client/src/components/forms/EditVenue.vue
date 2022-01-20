<template>
    <Form class="EditVenue">
        <FormGroup>
            <FormControl label="venue name" name="name" v-model="nameValue" />
        </FormGroup>
        <FormGroup>
            <FormControl
                label="venue location"
                name="location"
                v-model="locationNameValue"
            >
                <MapsAutoComplete
                    :query="locationNameValue"
                    @mousedown="(place) => setVenueLocation(place)"
                />
            </FormControl>
        </FormGroup>
        <FormGroup>
            <SaveCancel confirm @save="handleSave" @cancel="$emit('cancel')" />
        </FormGroup>
    </Form>
</template>

<script>
import { ref } from 'vue'

import { editVenue } from '../../store/venues'

import MapsAutoComplete from '../MapsAutoComplete.vue'

export default {
    name: 'EditVenue',
    emits: ['posted', 'cancel'],
    props: {
        venue: Object,
    },
    components: {
        MapsAutoComplete
    },
    setup (props, { emit }) {
        const nameValue = ref(props.venue.name)
        const locationNameValue = ref(props.venue.locationName)
        const locationAddressValue = ref(props.venue.locationAddress)
        const placeIdValue = ref(props.venue.placeId)

        const setVenueLocation = (place) => {
            locationNameValue.value = place.name
            locationAddressValue.value = place.formatted_address
            placeIdValue.value = place.place_id
        }

        const handleSave = async () => {
            const venueObj = {
                name: nameValue.value,
                locationName: locationNameValue.value,
                locationAddress: locationAddressValue.value,
                placeId: placeIdValue.value
            }
            await editVenue(props.venue._id, venueObj)

            emit('posted', venueObj)
        }

        return {
            nameValue,
            locationNameValue,
            setVenueLocation,
            handleSave
        }
    }
}
</script>