<template>
    <div class="CancelButton">
        <div v-if="confirm" class="confirm">
            <div class="buttons">
                <Button @click="(e) => handleCancel(e)">
                    <Typography>yes</Typography>
                </Button>
                <Button @click="(e) => toggleConfirm(e)">
                    <Typography>no</Typography>
                </Button>
            </div>
            <Typography class="confirm-text"
                >Discard any changes and cancel?</Typography
            >
        </div>
        <Button v-else @click="(e) => toggleConfirm(e)">
            <Typography>cancel</Typography>
        </Button>
    </div>
</template>

<script>
import { reactive, computed } from 'vue'
export default {
    name: 'CancelButton',
    emits: ['cancel'],
    setup (_, { emit }) {
        const state = reactive({
            confirm: false
        })

        const toggleConfirm = (e) => {
            e.preventDefault()

            state.confirm = !state.confirm
        }

        const handleCancel = (e) => {
            e.preventDefault()

            emit('cancel')
        }

        const confirm = computed(() => state.confirm)

        return {
            toggleConfirm,
            handleCancel,
            confirm
        }
    }
}
</script>

<style lang="scss">
.CancelButton {
    position: relative;

    .confirm-text {
        line-height: 1;
        margin-top: 1em;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
    }

    .Typography,
    .Button {
        margin-right: calc($spacing-small * 0.5);
    }
}
</style>