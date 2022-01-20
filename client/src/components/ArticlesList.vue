<template>
    <section class="ArticlesList">
        <Container>
            <Article
                isNew
                id="new-article"
                v-if="mode === 'add'"
                :mode="'edit'"
                @posted="$emit('posted')"
                @cancel="$emit('cancel')"
            />
            <Article
                v-for="article in store.articles.list"
                :key="article._id"
                :mode="mode"
                :article="article"
            />
        </Container>
    </section>
</template>

<script>
import { storeAllArticles } from '../store/articles'
import store from '../store/store'
import Article from './Article.vue'

export default {
    name: 'ArticlesList',
    emits: ['posted', 'cancel'],
    props: {
        mode: String
    },
    components: {
        Article
    },
    async setup () {
        if (!store.articles.list.length) await storeAllArticles()

        return {
            store
        }
    }
}
</script>

<style lang="scss">
.ArticlesList {
    padding: 6em 0;

    background: $background;
}
</style>