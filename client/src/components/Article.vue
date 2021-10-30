<template>
    <article class="Article">
        <Typography variant="h2">{{ article.title }}</Typography>
        <Typography>
            <pre>{{ article.body }}</pre>
        </Typography>
    </article>
</template>

<script>
import { provide, computed } from 'vue'

import store from '../store/store'

export default {
    name: 'Article',
    props: {
        article: Object
    },
    setup () {
        provide('store', store)

        const mode = computed(() => store.ui.mode)

        return {
            mode,
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
        margin-bottom: 1.5em;
    }

    &:first-of-type:before {
        position: absolute;
        top: 0;
        bottom: -400%;
        right: -25%;
        left: 10vw;
        opacity: 0.1;
        content: "";
        background: url("../assets/img/fractures-watermark.png") no-repeat;
        background-position: bottom right;
        background-size: cover;
    }
}
</style>