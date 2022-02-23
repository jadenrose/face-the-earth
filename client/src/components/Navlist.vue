<template>
    <ul class="navlist">
        <li class="navitem" v-for="(item, i) in items" :key="i">
            <router-link
                @click="$emit('close')"
                :class="{
                    linkText: item.label,
                    linkIcon: item.icon,
                    linkImg: item.img,
                }"
                v-if="item.to"
                :to="item.to"
            >
                <Typography bold hover v-if="item.label">{{
                    item.label
                }}</Typography>
                <AwesomeIcon v-if="item.icon" :icon="item.icon" />
                <img v-if="item.img" :src="`@/assets/img/${item.img}`" alt="" />
            </router-link>
            <a
                @click="$emit('close')"
                :class="{
                    linkText: item.label,
                    linkIcon: item.icon,
                    linkImg: item.img,
                }"
                v-if="item.href"
                :href="item.href"
                target="_blank"
            >
                <Typography bold hover v-if="item.label">{{
                    item.label
                }}</Typography>
                <AwesomeIcon v-if="item.icon" :icon="item.icon" />
                <img
                    v-if="item.img"
                    :src="require(`@/assets/img/${item.img}`)"
                    alt="no alt"
                />
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
    margin: 0 auto;
    padding: 0;
    align-items: center;
    justify-content: space-between;
    max-width: 70vw;

    .fab {
        font-size: 2.5em;
    }

    img {
        display: block;
        margin: 0;
        padding: 0;
        height: auto;
        max-width: 3em;
        max-height: 3em;
    }
}

.extLinks:not(.mobile) .navitem:last-child a {
    padding-right: 0;
}

.navitem a {
    display: block;
    color: inherit;
    text-decoration: none;

    &.linkText {
        padding: 1.3em;
        text-transform: uppercase;
    }

    &.linkIcon {
        padding: 1em;
    }

    &.linkImg {
        padding: 0.4em;
    }

    &:hover {
        filter: brightness(80%) saturate(350%);
    }

    &.router-link-exact-active {
        color: $color-deact;
        cursor: default;

        &:hover {
            color: $color-deact;
            filter: unset;
        }
    }
}

.SocialLinks.mobile img {
    width: 2em;
}
</style>