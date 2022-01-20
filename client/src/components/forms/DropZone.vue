<template>
    <div class="DropZone">
        <AwesomeIcon icon="fas fa-upload" />
        <div
            type="file"
            class="DropArea"
            @drop.prevent="(e) => handleDrop(e)"
            @dragenter.prevent="() => setHovering(true)"
            @dragleave.prevent="() => setHovering(false)"
            @dragover.prevent
            :style="{
                background: state.hovering ? 'rgba(255,255,255,0.1)' : 'none',
            }"
        >
            <input type="file" @click.stop @change="(e) => handleDrop(e)" />
            <div
                v-for="(file, index) of state.files"
                :key="index"
                @click.prevent="handleRemove(index)"
                class="filename"
            >
                <Typography>{{ file.name }}</Typography>
                <div class="filename-right">
                    <Typography class="remove-text">remove?</Typography>
                    <AwesomeIcon icon="fa fa-times" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue'

export default {
    name: 'DropZone',
    emits: ['input'],
    props: {
        files: {
            type: Array,
            default: () => ([])
        },
        allow: {
            type: Array,
            default: () => (['jpg', 'jpeg'])
        }
    },
    setup (props, { emit }) {
        const state = reactive({
            files: props.files,
            hovering: false
        })

        const setHovering = (bool) => state.hovering = bool
        const addFiles = (files) => state.files = [...state.files, ...files]


        const handleDrop = (e) => {
            const target = e.dataTransfer || e.target
            const files = target.files
            addFiles(files)
            emit('input', state.files)
        }

        const handleRemove = (index) => {
            state.files = state.files.filter((file, i) => i !== index)
            emit('input', state.files)
        }

        return {
            state,
            setHovering,
            handleDrop,
            handleRemove,
        }
    }
}
</script>

<style lang="scss">
.DropZone {
    position: relative;
    overflow-x: hidden;
    height: 200px;
    width: 100%;
    z-index: 0;
    padding: 0.5em;
    border-radius: 4px;
    box-shadow: 0 0 0 3px $background inset;

    .DropArea {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 1;

        input {
            display: none;
        }
    }

    .filename {
        font-weight: $normal;
        font-size: 90%;
        padding: 0.5em;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &:hover {
            background: rgba($color-main, 20%);

            .remove-text {
                display: block;
            }
        }

        .AwesomeIcon {
            font-size: 1.4rem;
        }
    }

    .filename-right {
        display: flex;
        align-items: center;
        justify-content: right;
    }

    .remove-text {
        display: none;
        margin-right: 1ch;
    }

    > .AwesomeIcon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0.2;
        font-weight: $bold;
        font-size: 5rem;
        user-select: none;
        z-index: -1;
    }
}

.upload-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5em 1.5em;
    background: $accent-main;
    color: $background;
    cursor: default;

    .AwesomeIcon {
        font-size: 1.5rem;
        cursor: pointer;

        &:hover {
            color: $background-hover;
        }
    }
}
</style>