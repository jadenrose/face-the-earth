<template>
    <article :class="`Article${token ? ' bordered' : ''}`">
        <AdminTools
            v-if="token"
            @edit="() => setMode('edit')"
            @remove="() => setMode('remove')"
            @move="() => setMode('move')"
        />

        <div v-if="token && mode === 'edit'" class="edit-content">
            <Form>
                <FormGroup>
                    <FormControl
                        label="title"
                        name="title"
                        v-model="titleValue"
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        category="textarea"
                        label="body"
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
                <FormGroup class="buttons">
                    <div class="button-wrapper">
                        <SaveButton @save="handleSave" />
                    </div>
                    <div class="button-wrapper">
                        <CancelButton @cancel="() => setMode(null)" />
                    </div>
                </FormGroup>
            </Form>
        </div>

        <div v-else class="readonly-content">
            <Typography variant="h2">{{ article.title }}</Typography>
            <Typography>
                <pre>{{ article.body }}</pre>
            </Typography>
            <a v-if="article.linkURL" :href="article.linkURL" target="_blank">
                <Button medium class="CTA">
                    <Typography>{{ article.linkLabel }}</Typography>
                </Button>
            </a>
        </div>
    </article>
</template>

<script>
import { computed, reactive, ref } from 'vue'

import store from '../store/store'
import { editArticle } from '../store/articles'

export default {
    name: 'Article',
    props: {
        article: Object
    },
    setup (props) {
        const titleValue = ref(props.article.title)
        const bodyValue = ref(props.article.body)
        const linkLabelValue = ref(props.article.linkLabel)
        const linkURLValue = ref(props.article.linkURL)

        const token = computed(() => store.user.token)

        const state = reactive({
            mode: null
        })

        const setMode = (mode) => state.mode = mode

        const mode = computed(() => state.mode)

        const handleSave = async () => {
            await editArticle(props.article._id, {
                title: titleValue.value,
                body: bodyValue.value,
                linkLabel: linkLabelValue.value,
                linkURL: linkURLValue.value
            })

            setMode(null)
        }

        return {
            titleValue,
            bodyValue,
            linkLabelValue,
            linkURLValue,
            token,
            setMode,
            mode,
            handleSave
        }
    }
}
</script>

<style lang="scss">
.Article {
    margin-bottom: calc($spacing-big * 2);
    position: relative;

    h2 {
        font-size: 2em;
        margin-bottom: $spacing-small;
    }

    // &:first-of-type:before {
    //     position: absolute;
    //     top: 0;
    //     bottom: -400%;
    //     right: -25%;
    //     left: 10vw;
    //     opacity: 0.1;
    //     content: "";
    //     background: url("../assets/img/fractures-watermark.png") no-repeat;
    //     background-position: bottom right;
    //     background-size: cover;
    // }

    .EditButton {
        position: absolute;
        top: 0;
        right: 0;
    }

    &.bordered {
        padding: $spacing-small;
        border: 3px solid;
        border-radius: 8px;

        &:before {
            display: none;
        }
    }

    .Form {
        margin: 0;
    }

    .button-wrapper {
        padding: 1em 4em 0 0;
    }

    .CTA {
        margin-top: $spacing-med;
    }
}
</style>