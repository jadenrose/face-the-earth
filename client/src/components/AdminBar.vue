<template>
    <div class="AdminBar">
        <Typography small>Logged in as admin ({{ user.email }})</Typography>
        <Logout />
    </div>
</template>

<script>
import Logout from '../components/Logout.vue'

export default {
    name: 'AdminBar',
    props: {
        user: Object
    },
    components: {
        Logout
    }
}
</script>

<style lang="scss">
.AdminBar {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 0;
    left: 0;
    width: 100%;
    background-color: $accent-main;
    color: $background;
    z-index: 999;
    padding: 0.3em 1em;
    font-weight: bold;
}
</style>