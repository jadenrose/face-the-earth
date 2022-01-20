<template>
    <ul class="navlist">
        <li class="navitem" v-for="(item, i) in items" :key="i">
            <router-link
                @click="$emit('close')"
                :class="{ linkText: item.label, linkIcon: item.ixcon }"
                v-if="item.to"
                :to="item.to"
            >
                <Typography bold hover v-if="item.label">{{
                    item.label
                }}</Typography>
                <AwesomeIcon v-if="item.icon" :icon="item.icon" />
            </router-link>
            <a
                @click="$emit('close')"
                :class="{ linkText: item.label, linkIcon: item.icon }"
                v-if="item.href"
                :href="item.href"
                target="_blank"
            >
                <Typography bold hover v-if="item.label">{{
                    item.label
                }}</Typography>
                <AwesomeIcon v-if="item.icon" :icon="item.icon" />
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'Navbar',
    props: ['items'],
    emits: ['close']
}
</script>

<style lang="scss">
.navlist {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    align-items: center;
}

.extLinks .navitem:last-child a {
    padding-right: 0;
}

.navitem a {
    display: block;
    color: inherit;
    text-decoration: none;

    &.linkText {
        padding: 1.3em;
    }

    &.linkIcon {
        padding: 1em;
    }

    &:hover {
        color: $accent-main;
    }

    &.router-link-exact-active {
        color: $color-deact;
        cursor: default;

        &:hover {
            color: $color-deact;
        }
    }
}

.fab {
    font-size: 2.5em;
}
</style>