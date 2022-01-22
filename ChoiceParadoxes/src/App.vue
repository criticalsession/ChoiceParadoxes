<template>
    <div id="app">
        <router-link to="/" v-if="!isHome" class="return-home">Return home</router-link>
        <router-view></router-view>
        <p class="footer">&copy;2022 <a href="https://github.com/criticalsession" target="_blank">Amante Reale</a></p>
    </div>
</template>

<script>
    export default {
        name: 'app',
        computed: {
            isHome() {
                return this.$route.name === 'home';
            },
        },
    };
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
</style>

