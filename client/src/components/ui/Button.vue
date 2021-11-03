<template>
    <button class="Button">
        <Typography>
            {{ label }}
        </Typography>
    </button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        label: {
            type: String,
            default: 'submit'
        }
    }
}
</script>

<style lang="scss">
.Button {
    display: inline-block;
    margin: 0;
    padding: 0;
    appearance: none;
    border: none;
    outline: none;
    padding: 1em 2em;

    margin-right: 2em;

    &:last-child {
        margin-right: 0;
    }
}
</style>