<template>
    <div class="app-main">
        <h1>ADMIN</h1>
        <h2>Change password</h2>
    </div>
</template>

<script>
export default {
    mounted() {
        if (localStorage.token) {
            //Make something...
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
