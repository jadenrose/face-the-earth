<template>
    <Form class="EditArticle">
        <FormGroup>
            <FormControl label="title" name="title" v-model="titleValue" />
        </FormGroup>
        <FormGroup>
            <FormControl
                category="textarea"
                label="body"
                name="body"
                v-model="bodyValue"
                :error="state.errors.body"
            />
        </FormGroup>
        <FormGroup>
            <FormControl
                label="button label"
                name="linkLabel"
                v-model="linkLabelValue"
                :error="state.errors.linkLabel"
            />
        </FormGroup>
        <FormGroup>
            <FormControl
                label="button link"
                name="linkURL"
                v-model="linkURLValue"
                :error="state.errors.linkURL"
            />
        </FormGroup>
        <FormGroup>
            <SaveCancel confirm @save="handleSave" @cancel="$emit('cancel')" />
        </FormGroup>
    </Form>
</template>

<script>
import { ref, reactive } from '@vue/reactivity'
import { isURL } from 'validator'

import { postArticle, editArticle } from '../../store/articles'

export default {
    name: 'EditArticle',
    emits: ['posted', 'cancel'],
    props: {
        article: Object,
        isNew: Boolean
    },
    setup (props, { emit }) {
        const initialErrors = {
            body: null,
            linkLabel: null,
            linkURL: null,
        }

        const titleValue = ref(props.article.title)
        const bodyValue = ref(props.article.body)
        const linkLabelValue = ref(props.article.linkLabel)
        const linkURLValue = ref(props.article.linkURL)


        const state = reactive({
            errors: initialErrors,
        })


        const handleSave = async () => {
            const errors = initialErrors

            try {
                if (!bodyValue.value) errors.body = 'body cannot be empty'
                if (linkLabelValue.value && !linkURLValue.value) errors.linkURL = 'button must have a URL if a label is included'
                if (linkURLValue.value && !isURL(linkURLValue.value)) errors.linkURL = 'must be a valid URL'

                if (Object.entries(errors).find(([key, value]) => value ? key : false))
                    return state.errors = { ...errors }

                if (props.isNew) {
                    await postArticle({
                        title: titleValue.value,
                        body: bodyValue.value,
                        linkLabel: linkLabelValue.value,
                        linkURL: linkURLValue.value,
                        displayPosition: 0,
                    })

                    emit('posted')
                } else {
                    await editArticle(props.article._id, {
                        title: titleValue.value,
                        body: bodyValue.value,
                        linkLabel: linkLabelValue.value,
                        linkURL: linkURLValue.value,
                        displayPosition: 0,
                    })

                    emit('posted')
                }

                state.errors = initialErrors

                emit('posted')
            } catch (err) {
                console.error(err)
                state.errors = { ...state.errors, ...err }
            }
        }

        return {
            state,
            titleValue,
            bodyValue,
            linkLabelValue,
            linkURLValue,
            handleSave,
        }
    }
}
</script>

<style>
</style>