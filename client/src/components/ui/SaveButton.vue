<template>
    <Button class="SaveButton" @click="(e) => handleSave(e)" label="save" />
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