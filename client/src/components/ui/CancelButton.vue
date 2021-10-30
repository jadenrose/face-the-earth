<template>
    <div class="CancelButton">
        <div v-if="confirm" class="confirm">
            <Typography>Discard any changes and cancel?</Typography>
            <Button @click="(e) => handleCancel(e)">
                <Typography>yes</Typography>
            </Button>
            <Button @click="(e) => toggleConfirm(e)">
                <Typography>no</Typography>
            </Button>
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

    .confirm {
        display: flex;
        align-items: center;
    }

    .Typography {
        max-width: 15ch;
        line-height: 1;
    }

    .Typography,
    .Button {
        margin-right: calc($spacing-small * 0.5);
    }
}
</style>