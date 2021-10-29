<template>
    <div class="Logout">
        <Button small @click="enableConfirm">
            <Typography>Logout</Typography>
        </Button>
        <div
            v-if="state.showConfirm"
            class="backdrop"
            @click.self="disableConfirm"
        >
            <div class="confirm">
                <Typography :sx="{ marginBottom: '1em' }"
                    >Are you sure? Any unsaved changes may be lost.</Typography
                >
                <Button @click="handleLogout">
                    <Typography>Yes</Typography>
                </Button>
                <Button @click="disableConfirm">
                    <Typography>No</Typography>
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
import { provide, reactive } from 'vue'

import { logout } from '../store/user'

import store from '../store/store'

export default {
    name: 'Logout',
    setup () {
        const state = reactive({
            showConfirm: false
        })

        provide('store', store)

        const enableConfirm = () => state.showConfirm = true
        const disableConfirm = () => state.showConfirm = false
        const handleLogout = () => logout()

        return {
            enableConfirm,
            disableConfirm,
            state,
            handleLogout,
        }
    }
}
</script>

<style lang="scss">
.Logout {
    z-index: 999;

    .backdrop {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .confirm {
        position: absolute;
        right: 1em;
        top: 1em;
        width: 400px;
        text-align: center;
        background: $accent-main;
        padding: 1em;
        box-shadow: 1px 1px 10px rgba($background, 0.35);
    }
}
</style>