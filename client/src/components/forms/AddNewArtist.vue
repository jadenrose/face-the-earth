<template>
    <Form class="AddNewArtist ShowForm">
        <Typography variant="h2" center :sx="{ marginBottom: '2em' }"
            >add new artist</Typography
        >
        <FormGroup>
            <FormControl
                label="artist name"
                name="newArtistName"
                v-model="nameValue"
            />
        </FormGroup>
        <FormGroup>
            <FormControl
                label="social link"
                name="newArtistLink"
                v-model="linkValue"
            />
        </FormGroup>
        <FormGroup>
            <SaveCancel confirm @save="handleSave" @cancel="$emit('cancel')" />
        </FormGroup>
    </Form>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { isURL } from 'validator'

import { postArtist } from '../../store/artists'

export default {
    name: 'AddNewArtist',
    emits: ['posted', 'cancel'],
    setup (props, { emit }) {
        const state = reactive({
            errors: {
                name: null,
                link: null,
            }
        })

        const nameValue = ref('')
        const linkValue = ref('')

        const handleSave = async () => {
            const errors = {
                name: null,
                link: null,
            }

            const {
                name, link,
            } = {
                name: nameValue.value,
                link: linkValue.value,
            }

            if (!name) errors.name = 'name is required'
            if (link && !isURL(link)) errors.link = 'link must be a valid URL'

            if (Object.entries(errors).find(([key, value]) => value ? key : false))
                return state.errors = { ...errors }

            const newArtist = await postArtist({
                name,
                link,
            })

            emit('posted', newArtist)
        }

        return {
            nameValue,
            linkValue,
            handleSave
        }
    }
}
</script>