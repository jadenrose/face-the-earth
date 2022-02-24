<template>
    <i
        :class="`AwesomeIcon${
            className ? className.padStart(className.length + 1) : ''
        }${icon ? icon.padStart(icon.length + 1) : ''}`"
        @click="$emit('click')"
    ></i>
</template>

<script>
export default {
    name: 'AwesomeIcon',
    emits: ['click'],
    props: {
        className: String,
        icon: String,
    }
}
</script>