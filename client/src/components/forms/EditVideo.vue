<template>
    <Form class="EditVideo">
        <FormGroup>
            <FormControl v-model="titleValue" label="video title" />
        </FormGroup>
        <FormGroup>
            <FormControl
                v-model="descValue"
                label="video description"
                category="textarea"
            />
        </FormGroup>
        <FormGroup>
            <FormControl
                v-model="urlValue"
                label="youtube URL"
                :error="state.errors.url"
            />
        </FormGroup>
        <FormGroup>
            <FormControl
                v-model="categoryValue"
                label="video category"
                :error="state.errors.category"
                category="select"
                :options="[
                    { label: 'music videos', value: 'musicVideos' },
                    { label: 'live performances', value: 'livePerformances' },
                    { label: 'lyric videos', value: 'lyricVideos' },
                ]"
                blockOther
            />
        </FormGroup>
        <FormGroup>
            <SaveCancel confirm @save="handleSave" @cancel="$emit('cancel')" />
        </FormGroup>
    </Form>
</template>

<script>
import { ref, reactive } from 'vue'
import { isURL } from 'validator'

import { postVideo, editVideo } from '../../store/videos'

export default {
    name: 'EditVideo',
    props: {
        video: Object,
        isNew: Boolean
    },
    setup: (props, { emit }) => {
        const titleValue = ref(props.video.title)
        const descValue = ref(props.video.desc)
        const urlValue = ref(props.video.url)
        const categoryValue = ref(props.video.category)

        const initialErrors = {
            url: null
        }

        const state = reactive({
            errors: initialErrors
        })

        const handleSave = async () => {
            const errors = initialErrors
            const showObj = {
                title: titleValue.value,
                desc: descValue.value,
                url: urlValue.value,
                category: categoryValue.value
            }

            if (!isURL(showObj.url)) errors.url = 'must be a valid url'
            if (!showObj.url.length) errors.url = 'url is required'

            if (Object.entries(errors).find(([key, value]) => value ? key : false))
                return state.errors = { ...errors }

            if (props.isNew) await postVideo(showObj)
            else await editVideo(props.video._id, showObj)

            emit('save')
        }

        return {
            state,
            titleValue,
            descValue,
            urlValue,
            categoryValue,
            handleSave
        }
    }
}
</script>

<style lang="scss">
.EditVideo {
    width: 90%;
    min-height: 300px;
}
</style>