<template>
    <div class="home">
        <h1>Choice Paradoxes</h1>
        <p>Choose a paradox: <router-link to="/mh">Monty Hall Problem</router-link> or <router-link to="/bb">Bertrand's Box Paradox</router-link></p>
        <p>For each paradox you will be given a choice to play the game yourself. Try it out a couple of times. When you're done, run the simulation. Click the "Explain" button to read why the problem tricks people, and how to solve it mathematically.</p>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        props: {

        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

