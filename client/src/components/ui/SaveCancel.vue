<template>
    <div class="SaveCancel">
        <SaveButton @save="() => $emit('save')" />
        <CancelButton @cancel="() => $emit('cancel')" />
    </div>
</template>

<script>
import SaveButton from './SaveButton.vue'
import CancelButton from './CancelButton.vue'

export default {
    name: 'SaveCancel',
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

    .SaveButton {
        margin-right: $spacing-small;
    }
}
</style>