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
                <SaveCancel @save="handleSave" @cancel="() => setMode(null)" />
            </Form>
        </div>

        <div v-else-if="token && mode === 'remove'" class="remove-content">
            <div class="confirm-remove">
                <Typography variant="h2"
                    >Really remove this article?</Typography
                >
                <div class="button-wrapper">
                    <Button big @click="handleRemove">Yes</Button>
                    <Button big @click="() => setMode(null)">No</Button>
                </div>
            </div>
        </div>

        <div v-else class="readonly-content">
            <Typography variant="h2">{{ article.title }}</Typography>
            <Typography>
                <pre>{{ article.body }}</pre>
            </Typography>
            <a
                class="article-link"
                v-if="article.linkURL"
                :href="article.linkURL"
                target="_blank"
            >
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
import { editArticle, removeArticle } from '../store/articles'

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

        const handleRemove = async () => {
            await removeArticle(props.article._id)

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
            handleSave,
            handleRemove
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

    .article-link {
        display: inline-block;
    }

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

    .remove-content {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 350px;
        width: 50%;
        background: $danger;
        border-radius: 8px;
    }

    .confirm-remove {
        color: $background;
        text-align: center;

        .button-wrapper {
            display: flex;
            justify-content: space-between;
            margin: 0;
            padding: 0;
        }

        .Button {
            background: $background;
            color: $color-main;
            display: block;

            &:hover {
                background: $background-light;
            }
        }
    }
}
</style>