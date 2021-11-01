<template>
    <section class="ArticlesList">
        <Article
            new
            id="new-article"
            v-if="mode === 'add'"
            :mode="'edit'"
            @posted="$emit('posted')"
            @canceled="$emit('canceled')"
        />
        <Article
            v-for="article in articles"
            :key="article._id"
            :article="article"
        />
    </section>
</template>

<script>
import { computed } from 'vue'

import { storeAllArticles } from '../store/articles'
import store from '../store/store'
import Article from './Article.vue'

export default {
    name: 'ArticlesList',
    props: {
        mode: String
    },
    emits: ['posted', 'canceled'],
    components: {
        Article
    },
    async setup () {
        if (!store.articles.list.length) await storeAllArticles()

        const articles = computed(() => store.articles.list)

        return {
            articles
        }
    }
}
</script>