<template>
    <label v-if="category === 'input'" :for="name" class="FormControl">
        <Typography v-if="labelText" :sx="{ marginBottom: '1em' }">
            {{ labelText }}
        </Typography>
        <input
            :type="type"
            :id="name"
            :value="modelValue"
            :autocomplete="type === 'password' ? 'current-password' : false"
            @input="$emit('update:modelValue', $event.target.value)"
            @focus="$emit('focus')"
        />
        <slot />
    </label>

    <label v-if="category === 'textarea'" :for="name" class="FormControl">
        <Typography :sx="{ marginBottom: '1em' }">
            {{ labelText }}
        </Typography>
        <textarea
            :id="name"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        />
        <slot />
    </label>

    <label
        v-if="category === 'select'"
        :for="name"
        class="FormControl"
        @input="$emit('update:modelValue', $event.target.value)"
    >
        <Typography :sx="{ marginBottom: '1em' }">
            {{ labelText }}
        </Typography>
        <select :value="modelValue" :id="name" :name="name">
            <option value="" disabled>make a selection...</option>

            <option
                v-for="option in options"
                :value="option.value"
                :key="option.value"
            >
                {{ option.label }}
            </option>

            <option v-if="!blockOther" value="other">other:</option>
        </select>
        <slot />
    </label>

    <label v-if="category === 'dropzone'" :for="name" class="FormControl">
        <Typography :sx="{ marginBottom: '1em' }">
            {{ labelText }}
        </Typography>

        <DropZone class="FormControl" @input="handleFiles" />
    </label>

    <Button v-if="category === 'submit'">
        <Typography>submit</Typography>
    </Button>

    <Alert v-if="error" severity="danger" :label="error" />
</template>

<script>
import { computed } from 'vue'

import DropZone from './DropZone.vue'

export default {
    name: 'FormControl',
    emits: ['focus', 'update:modelValue', 'files-added'],
    components: {
        DropZone
    },
    props: {
        label: String,
        name: String,
        category: {
            type: String,
            default: 'input'
        },
        type: {
            type: String,
            default: 'text'
        },
        required: Boolean,
        options: {
            type: Array,
            default: () => [],
        },
        blockOther: {
            type: Boolean,
            default: false
        },
        modelValue: [String, Array],
        error: String
    },
    setup (props, { emit }) {
        const labelText = computed(() => props.label ?
            `${props.label}${props.required ? ' *' : ''}` : null
        )

        const handleFiles = (files) => emit('update:modelValue', files)

        return { labelText, handleFiles }
    }
}
</script>

<style lang="scss">
label,
input,
select {
    display: block;
    width: 100%;
}

label {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: $bold;
    cursor: pointer;
    text-align: left;

    span {
        display: block;
        margin-bottom: 1em;
    }
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="password"],
input[type="date"],
textarea,
select {
    display: block;
    width: 100%;
    border-radius: 4px;
    border: none;
    outline: none;
    appearance: none;
    padding: 1.25em 1em;
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: $normal;
    color: $background;
    background: $color-main;
    letter-spacing: 1px;
    resize: none;

    &:focus {
        box-shadow: 0 0 1px 3px $accent-main inset;
    }

    option {
        padding: 1em;
    }
}

[inverted] {
    input,
    select,
    textarea {
        color: $color-main;
        background: $background;
    }

    label {
        color: $background;
    }
}

select {
    cursor: pointer;
    background-repeat: no-repeat;
    background-position-x: 95%;
    background-position-y: 50%;
    background-size: 1.5em;
}

textarea {
    height: 200px;
}

.Alert {
    margin-top: 1em;
}
</style>