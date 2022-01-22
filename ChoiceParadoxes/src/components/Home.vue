<template>
    <div class="home">
        <h1>Choice Paradoxes</h1>
        <Instructions>
            <p>&bull; For each paradox you will be given a choice to <strong>play</strong> the game yourself. Try it out a couple of times.</p>
            <p>&bull; When you're done, try running a <strong>simulation</strong>.
            <p>&bull; Click the <strong>Explain</strong> button to read why the problem tricks people, and how to solve it mathematically.</p>
        </Instructions>
        <p>Choose a paradox: <router-link to="/mh">Monty Hall Problem</router-link> <router-link to="/bb">Bertrand's Box Paradox</router-link></p>
    </div>
</template>

<script>
    import Instructions from './Instructions.vue';

    export default {
        name: 'Home',
        components: {
            Instructions,
        },
        props: {

        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

