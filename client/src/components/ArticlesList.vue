<template>
    <section class="ArticlesList">
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
    components: {
        Article
    },
    async setup () {
        await storeAllArticles()

        const articles = computed(() => store.articles.list)

        return {
            articles
        }
    }
}
</script>