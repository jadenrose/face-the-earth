<template>
    <Show
        isNew
        id="new-show"
        v-if="mode === 'add'"
        :mode="'edit'"
        @posted="$emit('posted')"
        @cancel="$emit('cancel')"
    />
    <Show v-for="show in shows" :key="show._id" :show="show" />
</template>

<script>
import Show from './Show.vue'

export default {
    name: 'ShowsList',
    emits: ['posted', 'cancel'],
    props: {
        shows: Array,
        mode: String
    },
    components: {
        Show
    },

}
</script>

<style lang="scss">
.Shows {
    margin-top: 6em;
    padding: 8em 0;

    .shows-list-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        flex-direction: column;

        @include tablet {
            flex-direction: row;
        }
    }
}
</style>