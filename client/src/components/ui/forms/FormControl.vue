<template>
    <label v-if="category === 'input'" :for="name" class="FormControl">
        <Typography :sx="{ marginBottom: '1em' }">
            {{ labelText }}
        </Typography>
        <input
            :type="type"
            :id="name"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
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

            <option value="other">other:</option>
        </select>
        <slot />
    </label>

    <Button v-if="category === 'submit'">
        <Typography>submit</Typography>
    </Button>

    <Alert v-if="error" severity="danger" :label="error" />
</template>

<script>
export default {
    name: 'FormControl',
    props: {
        label: {
            type: String,
            default: 'input'
        },
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
        modelValue: String,
        error: String
    },
    computed: {
        labelText: function () {
            return `${this.label}${this.required ? ' *' : ''}`
        }
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
    letter-spacing: 1px;
    font-weight: $bold;
    cursor: pointer;
    text-align: left;
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