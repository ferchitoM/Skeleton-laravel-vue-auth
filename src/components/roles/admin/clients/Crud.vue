<template>
    <div class="app-main">
        <!-- Toast -->
        <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div
                id="liveToast"
                class="toast text-bg-success border-0"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div class="d-flex">
                    <div class="toast-body">
                        {{ alert }}
                    </div>
                    <button
                        type="button"
                        class="btn-close btn-close-white me-2 m-auto"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                    ></button>
                </div>
            </div>
        </div>

        <!-- Add New User Modal Start -->
        <div class="modal fade" id="addNewUserModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            Add New Client
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            @click="reset_form"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="create">
                            <div class="mb-3">
                                <label class="form-label">Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="new_client.name"
                                />
                                <div class="form-text" v-if="errors.name">
                                    {{ errors.name[0] }}
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    v-model="new_client.email"
                                />
                                <div class="form-text" v-if="errors.email">
                                    {{ errors.email[0] }}
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    v-model="new_client.password"
                                />
                                <div class="form-text" v-if="errors.password">
                                    {{ errors.password[0] }}
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label"
                                    >Password confirmation</label
                                >
                                <input
                                    type="password"
                                    class="form-control"
                                    v-model="new_client.password_confirmation"
                                />
                                <div
                                    class="form-text"
                                    v-if="errors.password_confirmation"
                                >
                                    {{ errors.password_confirmation[0] }}
                                </div>
                            </div>

                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary">
                                    Add Client
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- Add New User Modal End -->

        <!-- Edit User Modal Start -->
        <div class="modal fade" id="editUserModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            Edit Client
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            @click="reset_form"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="update">
                            <div class="mb-3">
                                <label class="form-label">Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="edit_client.name"
                                />
                                <div class="form-text" v-if="errors.name">
                                    {{ errors.name[0] }}
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    v-model="edit_client.email"
                                />
                                <div class="form-text" v-if="errors.email">
                                    {{ errors.email[0] }}
                                </div>
                            </div>

                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary">
                                    Edit Client
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- Edit User Modal End -->

        <div class="container">
            <div class="row mt-4">
                <div
                    class="col-lg-12 d-flex justify-content-between align-items-center"
                >
                    <div>
                        <h4 class="text-primary">
                            All clients in the database!
                        </h4>
                    </div>
                    <div>
                        <button
                            class="btn btn-primary"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#addNewUserModal"
                        >
                            Add New Product
                        </button>
                    </div>
                </div>
            </div>
            <hr />
            <div class="row">
                <div class="col-lg-12">
                    <div id="showAlert"></div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="table-responsive">
                        <table
                            class="table table-striped table-bordered text-center"
                        >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="c in client_list"
                                    :key="'client' + c.id"
                                >
                                    <td>{{ c.name }}</td>
                                    <td>{{ c.email }}</td>
                                    <td>{{ c.role }}</td>
                                    <td class="icons">
                                        <span
                                            @click="edit(c)"
                                            class="material-symbols-outlined"
                                            data-bs-toggle="modal"
                                            data-bs-target="#editUserModal"
                                        >
                                            edit_note
                                        </span>
                                        <span class="material-symbols-outlined">
                                            <span
                                                class="material-symbols-outlined"
                                                data-bs-toggle="modal"
                                                data-bs-target="#deleteUserModal"
                                            >
                                                delete
                                            </span>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div
                            class="alert alert-danger text-center"
                            role="alert"
                            v-if="hay_clientes == 0"
                        >
                            No tienes clientes en tu base de datos.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style sccoped>
.icons {
    cursor: pointer;
}
</style>

<script>
export default {
    data() {
        return {
            client_list: [],
            hay_clientes: 0,
            alert: "",
            new_client: {
                name: "",
                email: "",
                role: "",
                password: "",
                password_confirmation: "",
            },
            edit_client: {
                name: "",
                email: "",
                role: "",
                password: "",
                password_confirmation: "",
            },
            errors: {},
        };
    },
    mounted() {
        this.getClients();
    },
    methods: {
        //Manage errors
        admin_errors(e) {
            this.errors = {};
            if (e.response.data.errors) this.errors = e.response.data.errors;
            else if (e.response.data.message == "Unauthenticated.") {
                this.$router.push({
                    name: "Login",
                    params: {
                        message:
                            "Tu sessión ha expirado, por favor intentalo de nuevo",
                    },
                });
            }
        },

        async getClients() {
            try {
                const res = await this.axios.get("/api/clients", {
                    headers: { Authorization: "Bearer " + localStorage.token },
                });
                this.client_list = res.data.client_list;
                this.hay_clientes = this.client_list.length;
            } catch (e) {
                this.admin_errors(e);
            }
        },

        async create() {
            const myModal = document.getElementById("addNewUserModal");
            const modal = bootstrap.Modal.getInstance(myModal);
            const myAlert = document.querySelector(".toast");
            const alert = new bootstrap.Toast(myAlert);

            try {
                const res = await this.axios.post(
                    "/api/clients",
                    this.new_client,
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.token,
                        },
                    }
                );
                this.getClients();
                this.reset_form();
                this.alert = res.data.message;

                modal.hide();
                alert.show();
            } catch (e) {
                this.admin_erorrs(e);
            }
        },

        edit(c) {
            this.edit_client = {
                name: c.name,
                email: c.email,
            };
        },

        async update() {
            const myModal = document.getElementById("editUserModal");
            const modal = bootstrap.Modal.getInstance(myModal);
            const myAlert = document.querySelector(".toast");
            const alert = new bootstrap.Toast(myAlert);

            try {
                const res = await this.axios.put(
                    "/api/clients",
                    this.edit_client,
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.token,
                        },
                    }
                );
                this.getClients();
                this.reset_form();
                this.alert = res.data.message;

                modal.hide();
                alert.show();
            } catch (e) {
                this.admin_erorrs(e);
            }
        },
        reset_form() {
            this.alert = "";
            this.new_client = {
                name: "",
                email: "",
                role: "",
                password: "",
                password_confirmation: "",
            };
        },
    },
};
</script>
