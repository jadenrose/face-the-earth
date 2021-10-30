<template>
    <Button @click="(e) => handleSave(e)">
        <Typography>save</Typography>
    </Button>
</template>

<script>
export default {
    name: 'SaveButton',
    emits: ['save'],
    setup (_, { emit }) {
        const handleSave = (e) => {
            e.preventDefault();

            emit('save')
        }

        return {
            handleSave
        }
    }
}
</script>