<template>
    <article :class="`Article${store.user.token ? ' edit' : ''}`">
        <AdminTools
            v-if="store.user.token"
            @edit="() => setMode('edit')"
            @remove="() => setMode('remove')"
            @move="() => setMode('move')"
            edit
            remove
            move
        />

        <EditArticle
            :isNew="isNew"
            v-if="state.mode === 'edit'"
            :article="article"
            @posted="handleSave"
            @cancel="handleCancel"
        />

        <div
            v-else-if="store.user.token && state.mode === 'remove'"
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

        <div
            v-else-if="store.user.token && state.mode === 'move'"
            class="move-content"
        >
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
import { computed, reactive } from 'vue'
import { scrollTo } from 'vue-scrollto'

import store from '../store/store'
import { removeArticle, moveArticle } from '../store/articles'

import EditArticle from './forms/EditArticle.vue'

export default {
    name: 'Article',
    props: {
        article: {
            type: Object,
            default: () => ({
                _id: '',
                title: '',
                body: '',
                linkLabel: '',
                linkURL: '',
                displayPosition: -1,
            })
        },
        isNew: {
            type: Boolean,
            default: false
        },
        mode: {
            type: String,
            default: null
        },
        new: {
            type: Boolean,
            default: false,
        }
    },
    emits: ['posted', 'cancel'],
    components: {
        EditArticle
    },
    setup (props, { emit }) {
        if (props.isNew) scrollTo('.Article', 100, {
            easing: 'ease-out',
            offset: -200,
        })

        const initialErrors = {
            body: '',
            linkLabel: '',
            linkURL: '',
        }

        const state = reactive({
            mode: props.mode,
            errors: initialErrors,
        })

        const lastIndex = computed(() => store.articles.list.length - 1)

        const setMode = (mode) => state.mode = mode

        const handleSave = () => {
            setMode(null)
            emit('posted')
        }

        const handleCancel = () => {
            setMode(null)
            emit('cancel')
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
            store,
            state,
            setMode,
            handleSave,
            handleCancel,
            lastIndex,
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
    min-height: calc($spacing-big * 3);

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