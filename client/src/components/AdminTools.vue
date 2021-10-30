<template>
    <div v-if="token" class="AdminTools">
        <div @click="$emit('edit')" class="edit tool" title="edit an item">
            <i class="fas fa-edit" />
        </div>
        <div
            @click="$emit('remove')"
            class="remove tool"
            title="remove an item"
        >
            <i class="fa fa-trash" />
        </div>
        <div @click="$emit('move')" class="move tool" title="re-arrange items">
            <i class="fa fa-arrows" />
        </div>
    </div>
</template>

<script>
import { provide, computed } from 'vue'

import { setMode } from '../store/ui'
import store from '../store/store'
export default {
    name: 'AdminTools',
    emits: ['edit', 'remove', 'move'],
    setup () {
        provide('store', store)

        const token = computed(() => store.user.token)

        const handleClick = (mode) => {
            setMode(mode)
        }

        return {
            token,
            handleClick
        }
    }
}
</script>

<style lang="scss">
.AdminTools {
    font-size: 2em;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: stretch;

    .tool {
        padding: 1em;
        cursor: pointer;
        text-align: center;

        &:hover {
            color: $accent-main;
        }
    }
}
</style>