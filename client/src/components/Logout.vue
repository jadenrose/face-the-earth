<template>
    <div class="Logout">
        <Button small @click="enableConfirm" label="Logout" />
        <div
            v-if="state.showConfirm"
            class="backdrop"
            @click.self="disableConfirm"
        >
            <div class="confirm">
                <Typography variant="p" :sx="{ marginBottom: '1em' }"
                    >Are you sure? Any unsaved changes may be lost.</Typography
                >
                <Button @click="handleLogout" label="yes" />
                <Button @click="disableConfirm" label="no" />
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
        max-width: 400px;
        text-align: center;
        background: $accent-main;
        padding: 1em;
        box-shadow: 1px 1px 10px rgba($background, 0.35);
    }
}
</style>