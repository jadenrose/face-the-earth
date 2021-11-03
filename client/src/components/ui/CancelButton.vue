<template>
    <div class="CancelButton">
        <div v-if="showConfirm" class="confirm">
            <div class="buttons">
                <Button @click="(e) => handleCancel(e)" label="yes" />
                <Button @click="(e) => toggleConfirm(e)" label="no" />
            </div>
            <Typography class="confirm-text"
                >Discard any changes and cancel?</Typography
            >
        </div>
        <Button v-else @click="(e) => handleClick(e)" label="cancel" />
    </div>
</template>

<script>
import { reactive, computed } from 'vue'
export default {
    name: 'CancelButton',
    emits: ['cancel'],
    props: {
        confirm: Boolean
    },
    setup (props, { emit }) {
        const state = reactive({
            showConfirm: false
        })

        const toggleConfirm = () => {
            state.showConfirm = !state.showConfirm
        }

        const handleClick = (e) => {
            e.preventDefault()

            if (props.confirm) return toggleConfirm()

            return emit('cancel')
        }

        const handleCancel = (e) => {
            e.preventDefault()

            emit('cancel')
        }

        const showConfirm = computed(() => state.showConfirm)

        return {
            toggleConfirm,
            handleClick,
            handleCancel,
            showConfirm,
        }
    }
}
</script>

<style lang="scss">
.CancelButton {
    position: relative;

    .buttons {
        display: flex;
    }

    .confirm-text {
        line-height: 1;
        margin-top: 1em;
    }
}
</style>