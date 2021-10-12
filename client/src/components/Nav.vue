<template>
    <nav class="Nav">
        <ul class="navlist">
            <li class="navitem" v-for="(item, i) in items" :key="i">
                <router-link v-if="item.to" :to="item.to">
                    <span v-if="item.label">{{ item.label }}</span>
                    <i v-if="item.icon" :class="`fab ${item.icon}`"></i>
                </router-link>
                <a v-if="item.href" :href="item.href">
                    <span v-if="item.label">{{ item.label }}</span>
                    <i v-if="item.icon" :class="`fab ${item.icon}`"></i>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Nav',
    props: ['items'],
}
</script>

<style lang="scss">
.Nav {
    .navlist {
        display: flex;
        list-style: none;
    }

    a {
        color: inherit;
        text-decoration: none;
        padding: 1em 1.5em;
    }

    .navitem:last-child a {
        padding-right: 0;
    }
}
</style>