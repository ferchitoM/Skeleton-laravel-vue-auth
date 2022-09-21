<template>
    <router-link class="link" to="/login">Acceder</router-link>
    <router-link class="link" to="/register">Registrarse</router-link>
    <router-link
        v-if="this.$route.path == '/account'"
        class="link"
        to="/account"
        >Tu cuenta</router-link
    >
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<style lang="css">
@import "../public/css/app.css";
</style>
