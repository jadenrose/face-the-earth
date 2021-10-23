<template>
    <AdminBar v-if="user" :user="user" />
    <slot />
</template>

<script>
import { provide, computed } from 'vue'
import jwt_decode from 'jwt-decode'

import AdminBar from '../components/AdminBar.vue'
import store from '../store/store'

export default {
    name: 'Editable',
    components: {
        AdminBar
    },
    setup () {
        provide('store', store)

        const user = computed(() => {
            try {
                const token = store.state.user.token

                return jwt_decode(token)
            } catch (err) {
                return null
            }
        })

        return {
            user
        }
    }
}
</script>