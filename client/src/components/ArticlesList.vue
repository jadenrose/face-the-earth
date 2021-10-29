<template>
    <section class="ArticlesList">
        <h2 v-for="article in articles" :key="article._id">
            {{ article.title }}
        </h2>
    </section>
</template>

<script>
import { computed } from 'vue'

import { storeAllArticles } from '../store/articles'
import store from '../store/store'

export default {
    name: 'ArticlesList',
    async setup () {
        await storeAllArticles()

        const articles = computed(() => store.articles.list)

        return {
            articles
        }
    }
}
</script>