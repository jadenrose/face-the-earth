<template>
    <div class="SaveCancel">
        <SaveButton @save="() => $emit('save')" />
        <CancelButton :confirm="confirm" @cancel="() => $emit('cancel')" />
    </div>
</template>

<script>
import SaveButton from './SaveButton.vue'
import CancelButton from './CancelButton.vue'

export default {
    name: 'SaveCancel',
    props: {
        confirm: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['save', 'cancel'],
    components: {
        SaveButton,
        CancelButton,
    }
}
</script>

<style lang="scss">
.SaveCancel {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .Button {
        height: 4em;
    }
}
</style>