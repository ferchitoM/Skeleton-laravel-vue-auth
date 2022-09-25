<template>
    <div class="app-navbar">
        <transition name="fade-nav" mode="out-in" appear>
            <nav>
                <h5>APPLICATION</h5>
                <section>
                    <router-link class="link" to="/login">Acceder</router-link>
                    <router-link class="link" to="/register"
                        >Registrarse</router-link
                    >
                </section>
            </nav>
        </transition>
    </div>
</template>
