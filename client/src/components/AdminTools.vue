<template>
    <div v-if="token" class="AdminTools">
        <div
            v-if="edit"
            @click="$emit('edit')"
            :class="`edit tool${mode === 'edit' ? ' disabled' : ''}`"
            title="edit an item"
        >
            <i class="fas fa-edit" />
        </div>
        <div
            v-if="remove"
            @click="$emit('remove')"
            :class="`remove tool${mode === 'remove' ? ' disabled' : ''}`"
            title="remove an item"
        >
            <i class="fa fa-trash" />
        </div>
        <div
            v-if="move"
            @click="$emit('move')"
            :class="`move tool${mode === 'move' ? ' disabled' : ''}`"
            title="re-arrange items"
        >
            <i class="fa fa-arrows" />
        </div>
    </div>
</template>

<script>
import { provide, computed } from 'vue'
import store from '../store/store'
export default {
    name: 'AdminTools',
    emits: ['edit', 'remove', 'move'],
    props: {
        edit: {
            type: Boolean,
            default: false,
        },
        remove: {
            type: Boolean,
            default: false,
        },
        move: {
            type: Boolean,
            default: false,
        },
        mode: String
    },
    setup () {
        provide('store', store)

        const token = computed(() => store.user.token)

        return {
            token,
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
    background: $background-light;
    border-radius: 12px 0 0 12px;

    .tool {
        padding: 1em;
        cursor: pointer;
        text-align: center;

        &:hover {
            color: $accent-main;
        }
    }

    .disabled {
        opacity: 0.2;
        cursor: default;

        &:hover {
            color: $color-main;
        }
    }
}
</style>