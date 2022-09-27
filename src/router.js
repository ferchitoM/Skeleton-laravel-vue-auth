import { createWebHistory, createRouter } from "vue-router";

//MAIN COMPONENTS
import Home from "./components/Home.vue";
import NavBar from "./components/NavBar.vue";
import Empty from "./components/Empty.vue"; //Empty component

//AUTH COMPONENTS
import Login from "./components/auth/Login.vue";
import Register from "./components/auth/Register.vue";
import ForgotPassword from "./components/auth/ForgotPassword.vue";
import ResetPassword from "./components/auth/ResetPassword.vue";
import SendEmail from "./components/auth/SendEmail.vue";
import VerifyEmail from "./components/auth/VerifyEmail.vue";

//USER COMPONENTS
import UserAside from "./components/roles/user/Aside.vue";
import UserNavBar from "./components/roles/user/NavBar.vue";
import UserEditProfile from "./components/roles/user/EditProfile.vue";
import UserChangePassword from "./components/roles/user/ChangePassword.vue";
import UserAccount from "./components/roles/user/Account.vue";
import UserProfile from "./components/roles/user/Profile.vue";
import UserTest from "./components/roles/user/Test.vue";

//ADMIN COMPONENTS
import AdminAside from "./components/roles/admin/Aside.vue";
import AdminNavBar from "./components/roles/admin/NavBar.vue";
import AdminEditProfile from "./components/roles/admin/EditProfile.vue";
import AdminChangePassword from "./components/roles/admin/ChangePassword.vue";
import AdminAccount from "./components/roles/admin/Account.vue";
import AdminProfile from "./components/roles/admin/Profile.vue";
import AdminTest from "./components/roles/admin/Test.vue";
//PRODUCTS
import ProductsCrud from "./components/roles/admin/products/Crud.vue";

const routes = [
    //AUTH ROUTES
    {
        path: "/",
        name: "Home",
        components: {
            NavBar: NavBar,
            default: Home,
        },
    },
    {
        path: "/login",
        name: "Login",
        components: {
            NavBar: NavBar,
            default: Login,
            Aside: Empty,
        },
    },
    {
        path: "/register",
        name: "Register",
        components: {
            NavBar: NavBar,
            default: Register,
        },
    },
    {
        path: "/forgot-password",
        name: "ForgotPassword",
        components: {
            default: ForgotPassword,
            NavBar: UserNavBar,
        },
    },
    {
        path: "/reset-password",
        name: "ResetPassword",
        component: ResetPassword,
    },
    {
        path: "/send-email",
        name: "SendEmail",
        components: {
            default: SendEmail,
            NavBar: UserNavBar,
        },
    },
    {
        path: "/verify-email",
        name: "VerifyEmail",
        components: {
            default: VerifyEmail,
            NavBar: UserNavBar,
        },
    },

    //USER ROUTES
    {
        path: "/user",
        redirect: "/login",
    },
    {
        path: "/user/account",
        name: "UserAccount",
        components: {
            default: UserAccount,
            Aside: UserAside,
            NavBar: UserNavBar,
        },
        children: [
            {
                path: "profile",
                component: UserProfile,
            },
            {
                path: "edit-profile",
                component: UserEditProfile,
            },
            {
                path: "change-password",
                component: UserChangePassword,
            },
            {
                path: "test",
                component: UserTest,
            },
        ],
    },

    //ADMIN ROUTES
    {
        path: "/admin",
        redirect: "/login",
    },
    {
        path: "/admin/account",
        name: "AdminAccount",
        components: {
            default: AdminAccount,
            Aside: AdminAside,
            NavBar: AdminNavBar,
        },
        children: [
            {
                path: "profile",
                component: AdminProfile,
            },
            {
                path: "edit-profile",
                component: AdminEditProfile,
            },
            {
                path: "change-password",
                component: AdminChangePassword,
            },
            {
                path: "test",
                component: AdminTest,
            },
            {
                path: "products",
                component: ProductsCrud,
            },
        ],
    },
];

const _router = createRouter({
    history: createWebHistory(),
    routes,
});

export default _router;
