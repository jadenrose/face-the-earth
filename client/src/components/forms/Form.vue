<template>
    <form class="Form">
        <slot />
    </form>
</template>

<script>
export default {
    name: 'Form'
}
</script>

<style lang="scss">
.Form {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    max-width: 550px;
}
</style>