<template>
    <div class="app-aside">
        <h1>USER ASIDE</h1>
        <router-link
            class="link"
            to="/user/account/profile"
            :class="{ 'link-selected': options[0] }"
            @click="select(0)"
        >
            Profile</router-link
        >
        <router-link
            class="link"
            to="/user/account/edit-profile"
            :class="{ 'link-selected': options[1] }"
            @click="select(1)"
            >Edit profile</router-link
        >
        <router-link
            class="link"
            to="/user/account/change-password"
            :class="{ 'link-selected': options[2] }"
            @click="select(2)"
            >Change password</router-link
        >
    </div>
</template>

<script>
export default {
    data() {
        return {
            options: [true, false, false],
        };
    },
    methods: {
        select(op) {
            this.options = [false, false, false];
            this.options[op] = true;
        },
    },
};
</script>
