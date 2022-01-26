<template>
    <div class="instructions">
        <p><strong>Instructions</strong></p>
        <slot></slot>
        <p v-if="hidePlayInstructions !== true" style="font-size: 0.8rem; text-align: center;"><i>(Click "Play!" and win the game once to unlock the simulations.)</i></p>
    </div>
</template>

<script>
    export default {
        name: 'Instructions',
        props: {
            hidePlayInstructions: Boolean
        },
    }
</script>