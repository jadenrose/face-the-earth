<template>
    <Button small @click="handleClick">
        <Typography>Logout</Typography>
    </Button>
</template>

<script>
import { provide } from 'vue'

import store from '../store/store'

export default {
    name: 'Logout',
    setup () {
        provide('store', store)

        const handleClick = () => {
            store.logout()
        }

        return {
            handleClick
        }
    }
}
</script>

<style>
</style>