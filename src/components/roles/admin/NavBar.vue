<template>
    <div class="app-navbar">
        <transition name="fade-nav" mode="out-in" appear>
            <nav>
                <h5>ADMIN NAVBAR</h5>
                <section>
                    <router-link class="link" to="/admin/account/test"
                        >Opcion1</router-link
                    >
                    <router-link class="link" to="">Opcion2</router-link>
                    <router-link class="link" to="">Opcion3</router-link>
                </section>
            </nav>
        </transition>
    </div>
</template>
