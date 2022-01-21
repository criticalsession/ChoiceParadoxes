<template>
    <div id="app">
        <router-link to="/" v-if="!isHome" class="return-home">Return home</router-link>
        <router-view></router-view>
        <p class="footer">&copy;2022 <strong>Amante Reale</strong> (CriticalSession)</p>
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
</style>

