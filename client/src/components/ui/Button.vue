<template>
    <button class="Button">
        <Typography>
            {{ label }}
            <slot />
        </Typography>
    </button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        label: String
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
    padding: 0.8em 2em;
    font-family: inherit;
    background: $accent-main;
    color: $background;
    font-weight: $bold;
    border-radius: 6px;
    cursor: pointer;

    margin-right: 2em;

    &:last-child {
        margin-right: 0;
    }

    .Typography {
        margin: 0;
        padding: 0;
    }

    &:hover {
        background: $accent-hover;
    }
}
</style>