<template>
    <div class="problem-navigation">
        <a :href="wikiLink" target="_blank">Wikipedia</a> <a v-on:click.stop="showExplanation" v-html="showingExplanation ? 'Hide Explanation' : 'Explanation'"></a>
    </div>
</template>

<script>
    export default {
        name: 'ProblemNavigation',
        methods: {
            showExplanation() {
                this.$emit('show-explanation');
            },
        },
        props: {
            wikiLink: String,
            showingExplanation: Boolean
        },
    };
</script>

<!--Add "scoped" attribute to limit CSS to this component only-->
<style scoped>
</style>