<template>
    <div class="home">
        <h1>Choice Paradoxes</h1>
        <Introduction :hidePlayIntroduction="true">
            <p>For each paradox you will be given a choice to <strong>play</strong> the game yourself. Try it out a couple of times.</p>
            <p>When you're done, try running a <strong>simulation</strong>.
            <p>Click the <strong>Explain</strong> button to read why the problem tricks people, and how to solve it mathematically.</p>
        </Introduction>
        <p>Choose a paradox: <router-link to="/mh">Monty Hall Problem</router-link> <router-link to="/bb">Bertrand's Box Paradox</router-link></p>
    </div>
</template>

<script>
    import Introduction from './Introduction.vue';

    export default {
        name: 'Home',
        components: {
            Introduction,
        },
        props: {

        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

