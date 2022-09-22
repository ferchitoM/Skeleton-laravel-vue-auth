import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/auth/Login.vue";
import Register from "./components/auth/Register.vue";
import Account from "./components/auth/Account.vue";
import ForgotPassword from "./components/auth/ForgotPassword.vue";
import ResetPassword from "./components/auth/ResetPassword.vue";
import EditProfile from "./components/user/EditProfile.vue";
import ChangePassword from "./components/user/ChangePassword.vue";
import SendEmail from "./components/auth/SendEmail.vue";
import VerifyEmail from "./components/auth/VerifyEmail.vue";
import Home from "./components/auth/Home.vue";
import Profile from "./components/auth/Profile.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/account",
        name: "Account",
        component: Account,
        children: [
            {
                path: "profile",
                component: Profile,
            },
            {
                path: "edit-profile",
                component: EditProfile,
            },
            {
                path: "change-password",
                component: ChangePassword,
            },
        ],
    },
    {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: ForgotPassword,
    },
    {
        path: "/reset-password",
        name: "ResetPassword",
        component: ResetPassword,
    },
    {
        path: "/send-email",
        name: "SendEmail",
        component: SendEmail,
    },
    {
        path: "/verify-email",
        name: "VerifyEmail",
        component: VerifyEmail,
    },
];

const _router = createRouter({
    history: createWebHistory(),
    routes,
});

export default _router;
