<template>
    <button class="Button" :style="styleVars">
        <slot />
    </button>
</template>

<script>
import { computed } from '@vue/reactivity'
export default {
    name: 'Button',
    props: {
        label: {
            type: String,
            default: 'click here'
        }
    },
    setup () {
        const styleVars = computed(() => {
            const randRotation = Math.floor(Math.random() * 10) - 5
            const randRotationReverse = randRotation * -1

            const randClipPath = `
				polygon(
					${Math.floor(Math.random() * 5) + 5}%
					${Math.floor(Math.random() * 5)}%,

					${Math.floor(Math.random() * 5) + 95}%
					${Math.floor(Math.random() * 5)}%,

					${Math.floor(Math.random() * 5) + 95}%
					${Math.floor(Math.random() * 5) + 95}%,

					0%
					${Math.floor(Math.random() * 5) + 95}%
				)
			`

            return {
                '--random-rotation': `rotate(${randRotation}deg)`,
                '--random-rotation-reverse': `rotate(${randRotationReverse}deg)`,
                '--random-clip-path': randClipPath,
            }
        })

        return { styleVars }
    }
}
</script>

<style lang="scss">
.Button {
    appearance: none;
    border: none;
    background: $accent-main;
    color: $background;
    font-family: inherit;
    font-size: 1.4rem;
    font-weight: $bold;
    text-transform: uppercase;
    padding: 2em 3em;

    &:hover,
    &:focus {
        background: $accent-hover;
    }

    &:active {
        background: $accent-main;
    }

    transform: var(--random-rotation);
    clip-path: var(--random-clip-path);

    span {
        display: block;
        transform: var(--random-rotation-reverse);
    }
}
</style>