<template lang="">
    <h1>Correo no verificado</h1>
    <h6>Tu cuenta no se ha verificado todavia</h6>
    <a @click="send_email()" class="waves-effect waves-light btn"
        >ENVIAR EMAIL DE VERIFICACIÓN</a
    >
    <br />
    <p v-if="message">{{ message }}</p>
    <br />
    <a @click="logout()" class="waves-effect waves-light btn">logout</a>
</template>

<script>
export default {
    data() {
        return {
            message: null,
        };
    },
    methods: {
        async send_email() {
            this.message = "Por favor espera...";

            try {
                const response = await this.axios.get("/api/email/resend", {
                    headers: { Authorization: "Bearer " + localStorage.token },
                });
                this.message = response.data.message;
            } catch (e) {
                this.$router.push({
                    name: "Login",
                    params: { message: "Usuario no autenticado" },
                });
            }
        },
        async logout() {
            localStorage.user = null;
            let msg = "";
            try {
                const response = await this.axios.get("/api/logout", {
                    headers: { Authorization: "Bearer " + localStorage.token },
                });
                msg = response.data.message;
            } catch (e) {
                msg = e.response.data.message;
            }

            this.$router.push({
                name: "Login",
                params: { message: msg },
            });
        },
    },
};
</script>
<style lang=""></style>
