<template>
    <div v-if="token" class="tools">
        <div
            @click="() => handleClick('edit')"
            class="edit tool"
            title="edit an item"
        >
            <i class="fas fa-edit" />
        </div>
        <div
            @click="() => handleClick('add')"
            class="add tool"
            title="add an item"
        >
            <i class="fas fa-plus-circle" />
        </div>
        <div
            @click="() => handleClick('remove')"
            class="remove tool"
            title="remove an item"
        >
            <i class="fa fa-trash" />
        </div>
        <div
            @click="() => handleClick('move')"
            class="move tool"
            title="re-arrange items"
        >
            <i class="fa fa-arrows" />
        </div>
    </div>
    <slot />
</template>

<script>
import { provide, computed } from 'vue'

import { setMode } from '../store/ui'
import store from '../store/store'

export default {
    name: 'Editable',
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
.tools {
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background: $accent-main;
    color: $background;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    .tool {
        font-size: 1.5em;
        padding: 1em;
        cursor: pointer;
        text-align: center;

        &:hover {
            background: $accent-hover;
        }
    }
}
</style>