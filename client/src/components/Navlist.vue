<template>
    <ul class="navlist">
        <li class="navitem" v-for="(item, i) in items" :key="i">
            <router-link
                :class="{ linkText: item.label, linkIcon: item.ixcon }"
                v-if="item.to"
                :to="item.to"
            >
                <Typography bold hover :size="1.2" v-if="item.label">{{
                    item.label
                }}</Typography>
                <AwesomeIcon v-if="item.icon" :icon="item.icon" />
            </router-link>
            <a
                :class="{ linkText: item.label, linkIcon: item.icon }"
                v-if="item.href"
                :href="item.href"
                target="_blank"
            >
                <Typography bold v-if="item.label">{{ item.label }}</Typography>
                <AwesomeIcon v-if="item.icon" :icon="item.icon" />
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'Navbar',
    props: ['items'],
}
</script>

<style lang="scss">
.navlist {
    display: flex;
    list-style: none;
}

a {
    color: inherit;
    text-decoration: none;

    &.linkText {
        padding: 1.3em 1.8em;
    }

    &.linkIcon {
        padding: 1.3em;
    }

    &:hover {
        color: $accent-main;
    }

    &.router-link-exact-active {
        color: $color-deact;
        cursor: default;

        &:hover {
            color: inherit;
        }
    }
}

.fab {
    font-size: 2.5em;
}

.navitem:last-child a {
    padding-right: 0;
}
</style>