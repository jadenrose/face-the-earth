<template>
    <i :class="`${className} ${icon}`"></i>
</template>

<script>
export default {
    name: 'AwesomeIcon',
    props: {
        className: String,
        icon: String,
    }
}
</script>