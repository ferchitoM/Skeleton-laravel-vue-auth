<template>
    <div class="app-main">
        <!-- Toast -->
        <div class="toast-container position-fixed bottom-0 p-3">
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
                        <section class="photo-container">
                            <div class="photo-prev">
                                <input
                                    type="file"
                                    id="new-client-input"
                                    @change="show_image"
                                    style="display: none"
                                />
                                <div class="preview" v-if="new_client.preview">
                                    <span
                                        class="material-symbols-outlined clear-image"
                                        @click="clear_image"
                                    >
                                        close
                                    </span>
                                    <img
                                        @click="open_browser"
                                        :src="new_client.preview"
                                    />
                                </div>
                                <span
                                    v-if="!new_client.preview"
                                    class="material-symbols-outlined"
                                    @click="open_browser"
                                >
                                    account_circle
                                </span>
                                <span>Your profile photo</span>
                            </div>
                        </section>
                        <form>
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
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-primary"
                            @click="create"
                        >
                            Add Client
                        </button>
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
                        <form>
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
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-primary"
                            @click="update"
                        >
                            Edit Client
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Edit User Modal End -->

        <!-- Delete User Modal Start -->
        <div class="modal fade" id="deleteUserModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            Delete Client
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
                        <p>¿Deseas eliminar al cliente:</p>
                        <p class="delete">
                            {{ edit_client.name }} <br />
                            {{ edit_client.email }}?
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-primary"
                            @click="destroy"
                        >
                            Delete Client
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Delete User Modal End -->

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
                            Add New Client
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
                                    <th>Profile</th>
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
                                    <td>
                                        <img
                                            v-if="c.image"
                                            :src="c.image"
                                            class="image-profile"
                                        />
                                        <span
                                            v-if="!c.image"
                                            class="material-symbols-outlined default-profile"
                                        >
                                            account_circle
                                        </span>
                                    </td>
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
                                        <span
                                            @click="edit(c)"
                                            class="material-symbols-outlined"
                                        >
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
.delete {
    padding: 0 1rem 0 1rem;
}
.toast-container {
    position: relative;
}
form {
    padding: 1.5rem;
}
.image-profile {
    width: 4rem;
    height: 4rem;
    object-fit: cover;
    border-radius: 50%;
}
.default-profile {
    font-size: 4rem;
    color: #ababab;
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
                image: null,
                preview: null,
            },
            edit_client: {
                id: "",
                name: "",
                email: "",
            },
            modal: null,
            toast: null,
            errors: {},
        };
    },
    mounted() {
        this.getClients();
        console.log(localStorage.token);
    },

    methods: {
        //Manage bootstrap modals and toast
        prepare_elements(name) {
            const myModal = document.getElementById(name); //Nombre del modal
            const myAlert = document.querySelector(".toast");
            this.modal = bootstrap.Modal.getInstance(myModal);
            this.toast = new bootstrap.Toast(myAlert);
        },
        //Manage errors
        manage_error_messages(e) {
            console.log(e);
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
                this.manage_error_messages(e);
            }
        },

        async create() {
            this.prepare_elements("addNewUserModal");
            try {
                console.log(this.new_client);
                const res = await this.axios.post(
                    "/api/clients",
                    this.new_client,
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.token,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                this.getClients();
                this.reset_form();
                this.alert = res.data.message;

                this.modal.hide();
                this.toast.show();
            } catch (e) {
                this.manage_error_messages(e);
            }
        },

        edit(c) {
            this.edit_client = {
                id: c.id,
                name: c.name,
                email: c.email,
            };
        },

        async update() {
            this.prepare_elements("editUserModal");

            try {
                const id = this.edit_client.id;
                const res = await this.axios.put(
                    `/api/clients/${id}`,
                    this.edit_client,
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.token,
                        },
                    }
                );
                this.getClients();
                this.alert = res.data.message;

                this.modal.hide();
                this.toast.show();
            } catch (e) {
                this.manage_error_messages(e);
            }
        },

        async destroy() {
            this.prepare_elements("deleteUserModal");

            try {
                const id = this.edit_client.id;
                const res = await this.axios.delete(`/api/clients/${id}`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.token,
                    },
                });
                this.getClients();
                this.alert = res.data.message;

                this.modal.hide();
                this.toast.show();
            } catch (e) {
                this.manage_error_messages(e);
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

        open_browser() {
            const input = document.getElementById("new-client-input");
            input.click();
        },
        show_image(e) {
            try {
                this.new_client.image = e.target.files[0];
                console.log(e.target.files[0]);
                const image = URL.createObjectURL(e.target.files[0]);
                this.new_client.preview = image;
            } catch (error) {
                this.new_client.image = null;
            }
        },
        clear_image() {
            this.new_client.image = null;
        },
    },
};
</script>
