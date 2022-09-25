<template>
    <div class="app-main">
        <h1>USER</h1>
        <h2>Mi perfil</h2>
        <p>Name: {{ user.name }}</p>
        <p>Email: {{ user.email }}</p>
        <p>Created at: {{ user.created_at }}</p>
        <button @click="logout()">Cerrar sesión</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            token: null,
            user: {},
        };
    },
    mounted() {
        if (localStorage.token) {
            this.token = localStorage.token;
            this.user = JSON.parse(localStorage.user);
        } else {
            this.$router.push({
                name: "Login",
                params: {
                    message: "No estas autorizado para acceder a esta cuenta",
                },
            });
        }
    },
    methods: {
        async logout() {
            try {
                console.log(this.token);
                const rs = await this.axios.get("/api/logout", {
                    headers: { Authorization: `Bearer ${this.token}` },
                });

                localStorage.clear();

                this.$router.push({
                    name: "Login",
                    params: {
                        message: rs.data.message,
                    },
                });
            } catch (e) {
                this.$router.push({
                    name: "Login",
                    params: {
                        message: e.response.data.message,
                    },
                });
            }
        },
    },
};
</script>
