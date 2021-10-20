<template>
    <slot />
</template>

<script>
import store from '../store/store'
import jwt_decode from 'jwt-decode'

export default {
    name: 'Private',
    beforeRouteEnter (to, from, next) {
        try {
            const { token } = store.state.user

            if (!token) return next({ name: 'Login' })

            const decoded = jwt_decode(token)

            console.log(decoded)

            next()
        } catch (err) {
            console.error(err)
            return next(false)
        }
    }
}
</script>

<style>
</style>