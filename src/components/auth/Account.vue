<template>
    <main>
        <aside>
            <Navigation />
        </aside>
        <section>
            <router-view></router-view>
        </section>
    </main>
</template>

<style scoped>
main {
    display: flex;
}
aside {
    flex: 10rem 0 0;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    gap: 0.5rem;
    border: 1px solid;
    padding: 0.5rem;
}
section {
    flex: 1;
    height: 80vh;
    margin-top: 1rem;
    border: 1px solid;
    padding: 0.5rem;
}
</style>

<script>
import Navigation from "../Aside.vue";

export default {
    components: { Navigation },

    mounted() {
        this.$router.push("account/profile");
    },
};
</script>
