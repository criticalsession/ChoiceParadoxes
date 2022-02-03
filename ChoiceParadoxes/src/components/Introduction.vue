<template>
    <div class="introduction">
        <p><strong>Introduction</strong> <a v-on:click="toggleIntroduction">({{ showIntroduction ? 'hide' : 'show' }})</a></p>
        <slot v-if="showIntroduction"></slot>
        <p v-if="hidePlayIntroduction !== true && showIntroduction" style="font-size: 0.8rem; text-align: center;"><i>(Click "Play!" and win the game once to unlock the simulations.)</i></p>
    </div>
</template>

<script>
    export default {
        name: 'Introduction',
        methods: {
            toggleIntroduction() {
                this.showIntroduction = !this.showIntroduction;
            }
        },
        data() {
            return {
                showIntroduction: true,
            }
        },
        props: {
            hidePlayIntroduction: Boolean,
            playingOrRunningSim: Boolean
        },
    }
</script>