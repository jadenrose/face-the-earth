<template>
    <h1
        @click="$emit('click')"
        v-if="variant === 'h1'"
        class="Typography"
        :style="{ fontSize: `${2.5 * size}em`, ...sx }"
    >
        <slot />
    </h1>
    <h2
        @click="$emit('click')"
        v-else-if="variant === 'h2'"
        class="Typography"
        :style="{ fontSize: `${2 * size}em`, ...sx }"
    >
        <slot />
    </h2>
    <h3
        @click="$emit('click')"
        v-else-if="variant === 'h3'"
        class="Typography"
        :style="{ fontSize: `${1.5 * size}em`, ...sx }"
    >
        <slot />
    </h3>
    <h4
        @click="$emit('click')"
        v-else-if="variant === 'h4'"
        class="Typography"
        :style="{ fontSize: `${1.2 * size}em`, ...sx }"
    >
        <slot />
    </h4>
    <span
        @click="$emit('click')"
        v-else
        class="Typography"
        :style="{ fontSize: `${size}em`, ...sx }"
    >
        <slot />
    </span>
</template>

<script>
export default {
    name: 'Typography',
    props: {
        variant: String,
        size: {
            type: Number,
            default: 1,
        },
        sx: Object
    },
    emits: ['click']
}
</script>

<style lang="scss">
.Typography {
    letter-spacing: 1px;

    &[bold] {
        font-weight: $bold;
    }

    &[link] {
        cursor: pointer;
        text-decoration: underline;
        text-decoration-thickness: 0.2em;
        text-decoration-color: $color-deact;

        &:hover {
            text-decoration-color: inherit;

            .text-decoration {
                color: inherit;
            }
        }
    }

    &[small] {
        font-size: 0.8em;
    }
}
</style>