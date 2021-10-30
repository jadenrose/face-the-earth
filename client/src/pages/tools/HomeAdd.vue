<template>
    <div @click.self="handleCancel" class="HomeAdd">
        <Form>
            <FormGroup>
                <FormControl
                    label="Article Header"
                    name="header"
                    v-model="titleValue"
                />
            </FormGroup>
            <FormGroup>
                <FormControl
                    category="textarea"
                    label="Article Body"
                    name="body"
                    v-model="bodyValue"
                />
            </FormGroup>
            <FormGroup>
                <FormControl
                    label="button label"
                    name="linkLabel"
                    v-model="linkLabelValue"
                />
            </FormGroup>
            <FormGroup>
                <FormControl
                    label="button link"
                    name="linkURL"
                    v-model="linkURLValue"
                />
            </FormGroup>
            <FormGroup>
                <SaveCancel
                    @save="handleSave"
                    @cancel="() => $emit('cancel')"
                />
            </FormGroup>
        </Form>
    </div>
</template>

<script>
import { provide, ref } from 'vue'

import { postArticle } from '../../store/articles'
import store from '../../store/store'

export default {
    name: 'HomeAdd',
    emits: ['cancel', 'close'],
    setup (_, { emit }) {
        provide('store', store)

        const articles = store.articles.list

        const titleValue = ref('')
        const bodyValue = ref('')
        const linkLabelValue = ref('')
        const linkURLValue = ref('')

        const handleSave = async () => {
            await postArticle({
                title: titleValue.value,
                body: bodyValue.value,
                linkLabel: linkLabelValue.value,
                linkURL: linkURLValue.value,
                displayPosition: articles.length
            })

            emit('close')
        }

        return {
            titleValue,
            bodyValue,
            linkLabelValue,
            linkURLValue,
            handleSave,
        }
    }
}
</script>

<style lang="scss">
.HomeAdd {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($background, 0.95);
    display: flex;
    align-items: center;
    z-index: 999;

    .Form {
        display: flex;
        flex-direction: column;
        background: $background-light;
        width: 90%;
        max-width: 700px;
        padding: 3em;
        border-radius: 4px;
        box-shadow: 10px 10px 100px $background;
    }
}
</style>