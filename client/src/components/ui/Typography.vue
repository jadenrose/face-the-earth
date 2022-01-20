<template>
    <h1
        @click="$emit('click')"
        v-if="variant === 'h1'"
        class="Typography h1"
        :style="{ ...sx }"
    >
        <span>
            <slot />
        </span>
    </h1>
    <h2
        @click="$emit('click')"
        v-else-if="variant === 'h2'"
        class="Typography h2"
        :style="{ ...sx }"
    >
        <span>
            <slot />
        </span>
    </h2>
    <h3
        @click="$emit('click')"
        v-else-if="variant === 'h3'"
        class="Typography h3"
        :style="{ ...sx }"
    >
        <span>
            <slot />
        </span>
    </h3>
    <h4
        @click="$emit('click')"
        v-else-if="variant === 'h4'"
        class="Typography h4"
        :style="{ ...sx }"
    >
        <span>
            <slot />
        </span>
    </h4>
    <p
        @click="$emit('click')"
        v-else-if="variant === 'p'"
        class="Typography p"
        :style="{ ...sx }"
    >
        <span>
            <slot />
        </span>
    </p>
    <span @click="$emit('click')" v-else class="Typography" :style="{ ...sx }">
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
    margin: 0;
    letter-spacing: 1px;
    max-width: 80ch;

    &[center] {
        text-align: center;
    }

    &[color="accent"] {
        color: $accent-main;
    }

    &[bold] {
        font-weight: $bold;
    }

    &[link] {
        cursor: pointer;
        text-decoration: underline;
        text-decoration-thickness: 0.2em;
        text-decoration-color: $accent-main;

        .text-decoration {
            color: $accent-main;
        }

        &:hover {
            text-decoration-color: $accent-hover;

            .text-decoration {
                color: $accent-hover;
            }
        }
    }

    &[small] {
        font-size: 80%;
    }

    pre {
        font-size: inherit;
        font-family: inherit;
        color: inherit;
        font-weight: inherit;
        white-space: pre-wrap;
        letter-spacing: inherit;
        line-height: inherit;
    }

    &.p {
        line-height: 1.6;
    }

    &.h1 {
        font-size: 2.4em;
    }

    &.h2 {
        font-size: 2em;
    }

    &.h3 {
        font-size: 1.6em;
    }

    &.h4 {
        font-size: 1.4em;
    }

    &.h1,
    &.h2 {
        line-height: 0.9;
    }
}
</style>