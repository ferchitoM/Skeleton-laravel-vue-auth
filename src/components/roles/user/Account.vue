<template>
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script>
export default {
    mounted() {
        if (localStorage.token) {
            this.$router.push("/user/account/profile");
        } else {
            this.$router.push({
                name: "Login",
                params: {
                    message: "No estas autorizado para acceder a esta cuenta",
                },
            });
        }
    },
};
</script>
