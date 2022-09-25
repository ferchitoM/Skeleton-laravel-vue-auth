<template>
    <div class="app-container">
        <router-view name="NavBar"></router-view>

        <div class="app-subcontainer">
            <router-view name="Aside"></router-view>
            <!-- component default -->
            <router-view></router-view>
        </div>
    </div>
</template>

<style lang="css">
@import "../public/css/app.css";
</style>
