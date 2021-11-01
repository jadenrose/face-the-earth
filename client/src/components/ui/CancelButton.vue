<template>
    <div class="CancelButton">
        <div v-if="showConfirm" class="confirm">
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
        <Button v-else @click="(e) => handleClick(e)">
            <Typography>cancel</Typography>
        </Button>
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