<template>
    <div
        :class="`Alert${
            severity === WARNING
                ? ` ${WARNING}`
                : severity === DANGER
                ? ` ${DANGER}`
                : ''
        }`"
    >
        <Typography bold small>{{ label }}</Typography>
    </div>
</template>

<script>
const WARNING = 'warning'
const DANGER = 'danger'

export default {
    name: 'Alert',
    props: {
        label: String,
        severity: {
            type: String,
            default: WARNING
        }
    },
    setup () {

        return {
            WARNING,
            DANGER
        }
    }
}
</script>

<style lang="scss">
.Alert {
    color: $background;
    width: 100%;
    padding: 0.5em;
    margin-bottom: 1em;
    border-radius: 4px;
    text-align: left;

    &.warning {
        background: $warning;
    }
    &.danger {
        background: $danger;
    }
}
</style>