<template>
    <Form class="AddNewVenue ShowForm">
        <Typography variant="h2" center :sx="{ marginBottom: '2em' }"
            >add new venue</Typography
        >
        <FormGroup>
            <FormControl label="venue name" name="name" v-model="nameValue" />
        </FormGroup>
        <FormGroup>
            <FormControl
                label="location (Google Maps)"
                name="location"
                v-model="locationNameValue"
            >
                <MapsAutoComplete
                    :query="locationNameValue"
                    @mousedown="setLocationValue"
                />
            </FormControl>
        </FormGroup>

        <FormGroup>
            <SaveCancel confirm @save="handleSave" @cancel="$emit('cancel')" />
        </FormGroup>
    </Form>
</template>

<script>
import { ref } from '@vue/reactivity'

import { postVenue } from '../../store/venues'

import MapsAutoComplete from '../MapsAutoComplete.vue'

export default {
    name: 'AddNewVenue',
    emits: ['posted', 'cancel'],
    components: {
        MapsAutoComplete
    },
    setup (props, { emit }) {
        const nameValue = ref('')
        const locationNameValue = ref('')
        const locationAddressValue = ref('')
        const placeIdValue = ref('')

        const setLocationValue = (place) => {
            locationNameValue.value = place.name
            locationAddressValue.value = place.formatted_address
            placeIdValue.value = place.place_id
        }

        const handleSave = async () => {
            const newVenue = await postVenue({
                name: nameValue.value,
                locationName: locationNameValue.value,
                locationAddress: locationAddressValue.value,
                placeId: placeIdValue.value
            })

            emit('posted', newVenue)
        }

        return {
            nameValue,
            locationNameValue,
            locationAddressValue,
            placeIdValue,
            setLocationValue,
            handleSave
        }
    }
}
</script>

<style>
</style>