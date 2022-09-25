<template lang="">
    <div class="app-main">
        <h1>Verificación de Email</h1>
        <p v-if="message">{{ message }}</p>
        <router-link v-if="verified" class="link" to="/login"
            >Ir a mi cuenta</router-link
        >
    </div>
</template>

<script>
import { createConditionalExpression } from "@vue/compiler-core";

export default {
    data() {
        return {
            message: null,
            url: "",
            verified: false,
        };
    },

    mounted() {
        if (this.$route.query) {
            this.url =
                this.$route.query.url +
                "&signature=" +
                this.$route.query.signature;
            this.verify_email();
        }
    },

    methods: {
        async verify_email() {
            try {
                const response = await this.axios.get(this.url, {
                    headers: {
                        Authorization: "Bearer " + localStorage.token,
                    },
                });
                this.verified = true;
                this.message = response.data.message;
            } catch (e) {
                localStorage.user = null;
                this.message = e.response.data.message;
            }
        },
    },
};
</script>
<style lang=""></style>
