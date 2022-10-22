<template>
    <main class="form-signin w-100 m-auto">
        <form @submit.prevent="login">
            <h1 class="h3 mb-3 fw-normal">Registro de usuario</h1>

            <div class="form-floating">
                <input
                    type="text"
                    class="form-control"
                    id="floatingName"
                    placeholder="name"
                    name="name"
                    v-model="form.name"
                />
                <label for="floatingName">Nombre</label>
            </div>
            <span class="error-message" v-if="errors.name">
                {{ errors.name[0] }}
            </span>
            <div class="form-floating">
                <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    name="email"
                    v-model="form.email"
                />
                <label for="floatingInput">Correo electrónico</label>
            </div>
            <span class="error-message" v-if="errors.email">
                {{ errors.email[0] }}
            </span>
            <div class="form-floating">
                <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                    v-model="form.password"
                />
                <label for="floatingPassword">Constraseña</label>
            </div>
            <span class="error-message" v-if="errors.password">
                {{ errors.password[0] }}
            </span>
            <div class="form-floating">
                <input
                    type="password"
                    class="form-control"
                    id="floatingPassword_confirmation"
                    name="password_confirmation"
                    v-model="form.password_confirmation"
                />
                <label for="floatingPassword_confirmation"
                    >Confirmar contraseña</label
                >
            </div>
            <span class="error-message" v-if="errors.password_confirmation">
                {{ errors.password_confirmation[0] }}
            </span>
            <button
                @click="register"
                class="w-100 btn btn-lg btn-primary"
                type="submit"
            >
                Registrarse
            </button>
            <router-link class="link" to="/login"
                >¿Ya estas registrado?</router-link
            >
            <p v-if="message" class="mt-5 mb-3 text-muted">{{ message }}</p>
        </form>
    </main>
</template>

<style scoped>
html,
body {
    height: 100%;
}

.error-message {
    color: red;
    margin: 0.5rem 0 0.5rem 0;
}
body {
    display: flex;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
}

.form-signin {
    max-width: 330px;
    padding: 15px;
}

.form-signin .form-floating:focus-within {
    z-index: 2;
}

.form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
.bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
}

@media (min-width: 768px) {
    .bd-placeholder-img-lg {
        font-size: 3.5rem;
    }
}

.b-example-divider {
    height: 3rem;
    background-color: rgba(0, 0, 0, 0.1);
    border: solid rgba(0, 0, 0, 0.15);
    border-width: 1px 0;
    box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
        inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.b-example-vr {
    flex-shrink: 0;
    width: 1.5rem;
    height: 100vh;
}

.bi {
    vertical-align: -0.125em;
    fill: currentColor;
}

.nav-scroller {
    position: relative;
    z-index: 2;
    height: 2.75rem;
    overflow-y: hidden;
}

.nav-scroller .nav {
    display: flex;
    flex-wrap: nowrap;
    padding-bottom: 1rem;
    margin-top: -1px;
    overflow-x: auto;
    text-align: center;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
}

form * {
    display: flex;
    align-content: center;
    justify-content: center;
}
</style>

<script>
export default {
    data() {
        return {
            message: null,
            form: {
                email: "",
                password: "",
                password_confirmation: "",
            },
            errors: {},
        };
    },

    methods: {
        async register() {
            try {
                const rs = await this.axios.post("/api/register", this.form);
                this.$router.push({
                    name: "Login",
                    params: { message: rs.data.message },
                });
            } catch (e) {
                console.log(e);
                this.errors = {};
                this.message = null;

                if (e.response.data.errors)
                    this.errors = e.response.data.errors;
                else if (e.response.data.message)
                    this.message = e.response.data.message;
            }
        },
    },
};
</script>
