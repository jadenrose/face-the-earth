<template>
    <article :class="`Article${token ? ' edit' : ''}`">
        <AdminTools
            v-if="token"
            @edit="() => setMode('edit')"
            @remove="() => setMode('remove')"
            @move="() => setMode('move')"
        />

        <div v-if="token && articleMode === 'edit'" class="edit-content">
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
                        :error="errors.body"
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        label="button label"
                        name="linkLabel"
                        v-model="linkLabelValue"
                        :error="errors.linkLabel"
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        label="button link"
                        name="linkURL"
                        v-model="linkURLValue"
                        :error="errors.linkURL"
                    />
                </FormGroup>
                <FormGroup>
                    <SaveCancel
                        confirm
                        @save="handleSave"
                        @cancel="handleCancel"
                    />
                </FormGroup>
            </Form>
        </div>

        <div
            v-else-if="token && articleMode === 'remove'"
            class="remove-content"
        >
            <div class="confirm-remove">
                <Typography variant="h2"
                    >Really remove this article?</Typography
                >
                <div class="button-wrapper">
                    <Button big @click="handleRemove" label="yes" />
                    <Button big @click="() => setMode(null)" label="no" />
                </div>
            </div>
        </div>

        <div v-else-if="token && articleMode === 'move'" class="move-content">
            <div
                v-if="article.displayPosition > 0"
                class="move-button"
                @click="moveUp"
            >
                <i class="fas fa-arrow-up" />
            </div>
            <div
                v-if="article.displayPosition < lastIndex"
                class="move-button"
                @click="moveDown"
            >
                <i class="fas fa-arrow-down" />
            </div>
            <div class="move-button" @click="() => setMode(null)">
                <Typography small bold>cancel</Typography>
            </div>
        </div>

        <div v-else class="readonly-content">
            <Typography v-if="article.title" variant="h2">{{
                article.title
            }}</Typography>
            <Typography>
                <pre>{{ article.body }}</pre>
            </Typography>
            <a
                class="article-link"
                v-if="article.linkURL"
                :href="article.linkURL"
                target="_blank"
            >
                <FancyButton medium class="CTA" :label="article.linkLabel" />
            </a>
        </div>
    </article>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { isURL } from 'validator'
import { scrollTo } from 'vue-scrollto'

import store from '../store/store'
import { postArticle, editArticle, removeArticle, moveArticle } from '../store/articles'

export default {
    name: 'Article',
    props: {
        article: Object,
        mode: {
            type: String,
            default: null
        },
        new: {
            type: Boolean,
            default: false,
        }
    },
    emits: ['posted', 'canceled'],
    setup (props, { emit }) {
        if (props.new) scrollTo('.Article', 100, {
            easing: 'ease-out',
            offset: -200,
        })

        const token = computed(() => store.user.token)

        const initialErrors = {
            body: '',
            linkLabel: '',
            linkURL: '',
        }

        const state = reactive({
            mode: props.mode,
            errors: initialErrors,
            title: props.article ? props.article.title : '',
            body: props.article ? props.article.body : '',
            linkLabel: props.article ? props.article.linkLabel : '',
            linkURL: props.article ? props.article.linkURL : '',
        })

        const titleValue = ref(state.title)
        const bodyValue = ref(state.body)
        const linkLabelValue = ref(state.linkLabel)
        const linkURLValue = ref(state.linkURL)

        const articleMode = computed(() => state.mode)
        const errors = computed(() => state.errors)
        const lastIndex = computed(() => store.articles.list.length - 1)

        const setMode = (mode) => state.mode = mode

        const handleSave = async () => {
            try {
                const errors = {}

                if (!bodyValue.value) errors.body = 'body cannot be empty'
                if (linkLabelValue.value && !linkURLValue.value) errors.linkURL = 'button must have a URL if a label is included'
                if (linkURLValue.value && !isURL(linkURLValue.value)) errors.linkURL = 'must be a valid URL'

                if (Object.entries(errors).length) throw errors

                if (props.new) {
                    await postArticle({
                        title: titleValue.value,
                        body: bodyValue.value,
                        linkLabel: linkLabelValue.value,
                        linkURL: linkURLValue.value,
                    })

                    emit('posted')
                } else {
                    await editArticle(props.article._id, {
                        title: titleValue.value,
                        body: bodyValue.value,
                        linkLabel: linkLabelValue.value,
                        linkURL: linkURLValue.value
                    })
                }

                state.errors = initialErrors

                setMode(null)
            } catch (err) {
                console.log(err)
                state.errors = { ...state.errors, ...err }
            }
        }

        const handleCancel = () => {
            state.errors = initialErrors

            if (props.new) emit('canceled')

            titleValue.value = state.title
            bodyValue.value = state.body
            linkLabelValue.value = state.linkLabel
            linkURLValue.value = state.linkURL

            setMode(null)
        }

        const handleRemove = async () => {
            await removeArticle(props.article._id)

            setMode(null)
        }

        const moveUp = () => {
            moveArticle(props.article.displayPosition, -1)

            setMode(null)
        }

        const moveDown = () => {
            moveArticle(props.article.displayPosition, 1)

            setMode(null)
        }

        return {
            titleValue,
            bodyValue,
            linkLabelValue,
            linkURLValue,
            token,
            setMode,
            articleMode,
            errors,
            lastIndex,
            handleSave,
            handleCancel,
            handleRemove,
            moveUp,
            moveDown
        }
    }
}
</script>

<style lang="scss">
.Article {
    margin-bottom: calc($spacing-big * 2);
    position: relative;

    &:last-child {
        margin-bottom: 0;
    }

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

    &.edit {
        padding: $spacing-small;
        background: $background-light;
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

    .readonly-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .remove-content,
    .move-content {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 350px;
        width: 50%;
        border-radius: 8px;
    }

    .move-content {
        justify-content: left;
    }

    .remove-content {
        background: $danger;
    }

    .move-content {
        font-size: 2em;
        .fas {
            font-size: 2em;
        }
    }

    .move-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: $accent-main;
        color: $background;
        padding: 1em;
        margin: 1em;
        border-radius: 50%;
        width: 4em;
        height: 4em;
        cursor: pointer;

        &:hover {
            background: $accent-hover;
        }
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