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
      <div
         class="modal fade"
         id="addNewUserModal"
         tabindex="-1"
         data-bs-backdrop="static"
      >
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
                  <!-- Image management -->
                  <section class="photo-container">
                     <div class="photo-prev">
                        <input
                           type="file"
                           id="new-client-input"
                           @change="show_image"
                           style="display: none"
                        />
                        <!-- Image client exist and is not loading a new image -->
                        <div class="preview" v-if="client.url && !loading">
                           <span
                              class="material-symbols-outlined clear-image"
                              @click="clear_image('new-client-input')"
                           >
                              close
                           </span>
                           <img
                              @click="open_browser('new-client-input')"
                              :src="client.url"
                           />
                        </div>
                        <!-- Image client not exist and is not loading a new image -->
                        <span
                           v-if="!client.url && !loading"
                           class="material-symbols-outlined"
                           @click="open_browser('new-client-input')"
                        >
                           account_circle
                        </span>

                        <div
                           v-if="loading"
                           class="loading"
                           @click="open_browser('new-client-input')"
                        ></div>
                        <!-- User can stop the image loading -->
                        <span
                           v-if="loading"
                           class="image_text"
                           :class="{ stop: loading }"
                           @click="stop_loading()"
                           @mouseover="image_text = 'Stop loading!'"
                           @mouseleave="image_text = 'Loading...'"
                           >{{ image_text }}</span
                        >
                        <span v-if="!loading" class="image_text"
                           >Your profile photo</span
                        >
                     </div>
                     <div class="form-text" v-if="errors.image">
                        {{ errors.image[0] }}
                     </div>
                  </section>
                  <!-- Image management -->
                  <form>
                     <div class="mb-3">
                        <label class="form-label">Name</label>
                        <input
                           type="text"
                           class="form-control"
                           v-model="client.name"
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
                           v-model="client.email"
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
                           v-model="client.password"
                        />
                        <div class="form-text" v-if="errors.password">
                           {{ errors.password[0] }}
                        </div>
                     </div>
                     <div class="mb-3">
                        <label class="form-label">Password confirmation</label>
                        <input
                           type="password"
                           class="form-control"
                           v-model="client.password_confirmation"
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
                  <button type="button" class="btn btn-primary" @click="create">
                     Add Client
                  </button>
               </div>
            </div>
         </div>
      </div>
      <!-- Add New User Modal End -->

      <!-- Edit User Modal Start -->
      <div
         class="modal fade"
         id="editUserModal"
         tabindex="-1"
         data-bs-backdrop="static"
      >
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
                     @click="cancel_form()"
                  ></button>
               </div>

               <div class="modal-body">
                  <!-- Image management -->
                  <section class="photo-container">
                     <div class="photo-prev">
                        <input
                           type="file"
                           id="edit-client-input"
                           @change="show_image"
                           style="display: none"
                        />

                        <!-- Image client exist and is not loading a new image -->
                        <div class="preview" v-if="client.url && !loading">
                           <span
                              class="material-symbols-outlined clear-image"
                              @click="clear_image('edit-client-input')"
                           >
                              close
                           </span>
                           <img
                              @click="open_browser('edit-client-input')"
                              :src="client.url"
                           />
                        </div>
                        <!-- Image client not exist and is not loading a new image -->
                        <span
                           v-if="!client.url && !loading"
                           class="material-symbols-outlined"
                           @click="open_browser('edit-client-input')"
                        >
                           account_circle
                        </span>
                        <div
                           v-if="loading"
                           class="loading"
                           @click="open_browser('edit-client-input')"
                        ></div>
                        <!-- User can stop the image loading -->
                        <span
                           v-if="loading"
                           class="image_text"
                           :class="{ stop: loading }"
                           @click="stop_loading()"
                           @mouseover="image_text = 'Stop loading!'"
                           @mouseleave="image_text = 'Loading...'"
                           >{{ image_text }}</span
                        >
                        <span v-if="!loading" class="image_text"
                           >Your profile photo</span
                        >
                     </div>
                     <div class="form-text" v-if="errors.image">
                        {{ errors.image[0] }}
                     </div>
                  </section>
                  <!-- Image management -->

                  <form>
                     <div class="mb-3">
                        <label class="form-label">Name</label>
                        <input
                           type="text"
                           class="form-control"
                           v-model="client.name"
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
                           v-model="client.email"
                        />
                        <div class="form-text" v-if="errors.email">
                           {{ errors.email[0] }}
                        </div>
                     </div>
                  </form>
               </div>
               <div class="modal-footer">
                  <button type="button" class="btn btn-primary" @click="update">
                     Edit Client
                  </button>
               </div>
            </div>
         </div>
      </div>
      <!-- Edit User Modal End -->

      <!-- Delete User Modal Start -->
      <div
         class="modal fade"
         id="deleteUserModal"
         tabindex="-1"
         data-bs-backdrop="static"
      >
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
                  <h6>
                     <p>¿Deseas eliminar a este cliente?:</p>
                  </h6>
                  <!-- Image management -->
                  <section class="photo-container delete">
                     <div class="photo-prev">
                        <div v-if="client.url" class="preview">
                           <img :src="client.url" />
                        </div>
                        <span
                           v-if="!client.url"
                           class="material-symbols-outlined"
                        >
                           account_circle
                        </span>
                     </div>
                  </section>
                  <!-- Image management -->

                  <p class="delete">{{ client.name }}</p>
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

      <!-- Restore User Modal Start -->
      <div
         class="modal fade"
         id="restoreUserModal"
         tabindex="-1"
         data-bs-backdrop="static"
      >
         <div class="modal-dialog">
            <div class="modal-content">
               <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                     Restore Client
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
                  <h6>
                     <p>¿Deseas restablecer a este cliente?:</p>
                  </h6>
                  <!-- Image management -->
                  <section class="photo-container delete">
                     <div class="photo-prev">
                        <div v-if="client.url" class="preview">
                           <img :src="client.url" class="soft-delete" />
                        </div>
                        <span
                           v-if="!client.url"
                           class="material-symbols-outlined soft-delete"
                        >
                           account_circle
                        </span>
                     </div>
                  </section>
                  <!-- Image management -->

                  <p class="delete soft-delete">{{ client.name }}</p>
               </div>
               <div class="modal-footer">
                  <button
                     type="button"
                     class="btn btn-primary"
                     @click="restore"
                  >
                     Restore Client
                  </button>
               </div>
            </div>
         </div>
      </div>
      <!-- Restore User Modal End -->

      <div class="container">
         <div class="row mt-4">
            <div
               class="col-lg-12 d-flex justify-content-between align-items-center"
            >
               <div>
                  <h4 class="text-primary">Active client list</h4>
               </div>
               <div>
                  <button
                     class="btn btn-primary"
                     type="button"
                     data-bs-toggle="modal"
                     data-bs-target="#addNewUserModal"
                     @click="reset_form"
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
                  <table class="table table-striped table-bordered text-center">
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
                        <tr v-for="c in client_list" :key="'client' + c.id">
                           <td>
                              <!-- Image client exist and is not loading a new image -->
                              <img
                                 v-if="c.image && !c.url"
                                 :src="axios.defaults.baseURL + c.image"
                                 class="image-profile"
                                 :id="'client' + c.id"
                              />
                              <!-- Image client exist and uploaded a new image -->
                              <img
                                 v-if="c.url && !loading"
                                 :src="c.url"
                                 class="image-profile"
                                 :id="'client' + c.id"
                              />

                              <!-- Image client not exist and is not loading a new image -->
                              <span
                                 v-if="!c.image && !loading"
                                 :id="'client' + c.id"
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
                                 data-bs-toggle="modal"
                                 data-bs-target="#deleteUserModal"
                              >
                                 delete
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

      <!-- Deleted clients -->
      <div class="container">
         <div class="row mt-4">
            <div
               class="col-lg-12 d-flex justify-content-between align-items-center"
            >
               <div>
                  <h4 class="text-primary">Soft-deleted client list</h4>
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
                  <table class="table table-striped table-bordered text-center">
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
                           v-for="c in client_list_deleted"
                           :key="'client_d' + c.id"
                        >
                           <td>
                              <!-- Image client exist and is not loading a new image -->
                              <img
                                 v-if="c.image"
                                 :src="axios.defaults.baseURL + c.image"
                                 class="image-profile soft-delete"
                              />

                              <!-- Image client not exist and is not loading a new image -->
                              <span
                                 v-if="!c.image"
                                 class="material-symbols-outlined default-profile soft-delete"
                              >
                                 account_circle
                              </span>
                           </td>
                           <td class="soft-delete">{{ c.name }}</td>
                           <td class="soft-delete">{{ c.email }}</td>
                           <td class="soft-delete">{{ c.role }}</td>
                           <td class="icons">
                              <span
                                 @click="edit(c)"
                                 class="material-symbols-outlined"
                                 data-bs-toggle="modal"
                                 data-bs-target="#restoreUserModal"
                              >
                                 restore_from_trash
                              </span>
                           </td>
                        </tr>
                     </tbody>
                  </table>
                  <div
                     class="alert alert-danger text-center"
                     role="alert"
                     v-if="hay_clientes_eliminados == 0"
                  >
                     No tienes clientes eliminados en tu base de datos.
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
   text-align: center;
}
.toast-container {
   position: relative;
}
form {
   padding: 1.5rem;
}
.image-profile {
   width: 2rem;
   height: 2rem;
   object-fit: cover;
   border-radius: 50%;
}
.default-profile {
   font-size: 2rem;
   color: #ababab;
}
</style>

<script>
export default {
   data() {
      return {
         client_list: [],
         client_list_deleted: [],
         timer: null,
         hay_clientes: 0,
         hay_clientes_eliminados: 0,
         alert: "",
         client: {
            id: null,
            name: "",
            email: "",
            role: "",
            password: "",
            password_confirmation: "",
            image: null,
            url: null,
            preview: null,
            updated: null, //backend action
         },
         loading: false,
         image_text: "Loading image...",
         client_copy: {},
         modal: null,
         toast: null,
         errors: {},
      };
   },
   mounted() {
      this.getClients();
      console.log(localStorage.token);

      //Launch database changes verification
      clearInterval(this.timer);
      this.timer = setInterval(() => {
         this.db_changes();
      }, 10000);
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
            this.modal.hide();
            this.toast.show();
         }
      },

      async getClients() {
         try {
            const res = await this.axios.get("/api/clients", {
               headers: { Authorization: "Bearer " + localStorage.token },
            });
            this.client_list = res.data.client_list;
            this.client_list_deleted = res.data.client_list_deleted;

            this.hay_clientes = this.client_list.length;
            this.hay_clientes_eliminados = this.client_list_deleted.length;
         } catch (e) {
            this.manage_error_messages(e);
         }
      },

      async create() {
         this.prepare_elements("addNewUserModal");
         try {
            const res = await this.axios.post("/api/clients", this.client, {
               headers: {
                  Authorization: "Bearer " + localStorage.token,
                  "Content-Type": "multipart/form-data", //Permite enviar imágenes
               },
            });
            this.getClients();
            this.reset_form();
            this.alert = res.data.message;
            this.clear_image("new-client-input");

            this.modal.hide();
            this.toast.show();
         } catch (e) {
            this.manage_error_messages(e);
         }
      },

      edit(c) {
         this.client = c;
         this.client.preview = false;
         this.client.updated = null;
         this.client.url = this.client.image
            ? this.axios.defaults.baseURL + this.client.image
            : null;
         this.client_copy = Object.assign({}, this.client);

         this.image_text = "You profile photo";
         this.loading = false;
      },

      async update() {
         this.prepare_elements("editUserModal");
         try {
            const id = this.client.id;
            const res = await this.axios.post(
               `/api/clients/update/${id}`,
               this.client,
               {
                  headers: {
                     Authorization: "Bearer " + localStorage.token,
                     "Content-Type": "multipart/form-data", //Permite enviar imágenes
                  },
               }
            );
            this.getClients();
            this.alert = res.data.message;
            this.clear_image("edit-client-input");

            this.modal.hide();
            this.toast.show();
         } catch (e) {
            this.manage_error_messages(e);
         }
      },

      async destroy() {
         this.prepare_elements("deleteUserModal");

         try {
            const id = this.client.id;
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

      async restore() {
         this.prepare_elements("restoreUserModal");

         try {
            const id = this.client.id;
            const res = await this.axios.delete(`/api/clients/restore/${id}`, {
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

      //View database changes and update the clients
      async db_changes() {
         console.log("updating list...");
         try {
            const res = await this.axios.get("/api/clients", {
               headers: { Authorization: "Bearer " + localStorage.token },
            });

            let updated_list = res.data.client_list;
            let client = null;

            //Comparte the client list with update list
            updated_list.forEach((client_updated) => {
               client = this.client_list.find(
                  (item) => item.id == client_updated.id
               );

               if (client) {
                  //If client name changes then update table
                  if (client.name != client_updated.name) {
                     client.name = client_updated.name;

                     //Add css class to show the change in table
                     let div = document.getElementById("client" + client.id);
                     div.classList.remove("flash-icon");
                     div.classList.add("flash-icon");

                     console.log("cliente changed: " + client.name);
                  }
               }
               client = null;
            });
         } catch (e) {
            this.manage_error_messages(e);
         }
      },

      reset_form() {
         this.alert = "";
         this.client = {
            name: "",
            email: "",
            role: "",
            password: "",
            password_confirmation: "",
            image: null,
            url: null,
            preview: null,
            updated: null, //backend action
         };
         this.errors = {};
         this.loading = false;
         this.image_text = "Loading image...";
      },

      cancel_form() {
         Object.assign(this.client, this.client_copy);
         this.loading = false;
         this.client.updated = null;
      },

      open_browser(input_name) {
         const input = document.getElementById(input_name);
         input.click();
         this.loading = true;
         this.client.updated = null;
         this.image_text = "Loading...";
      },

      show_image(e) {
         if (e.target.files[0]) {
            console.log("updated!");
            this.client.updated = true;

            this.client.image = e.target.files[0];
            this.client.url = URL.createObjectURL(e.target.files[0]);
         } else {
            console.log("No se seleccionó ninguna imagen!!");
            this.client.url = this.client_copy.url;
         }

         this.loading = false;
      },

      clear_image(input_name) {
         this.client.image = null;
         this.client.updated = true;
         this.client.url = null;
         document.getElementById(input_name).value = null; //clear input file
      },

      stop_loading() {
         console.log("cancelaste la carga!!");
         this.client.url = this.client_copy.url;
         this.loading = false;
      },
   },
};
</script>
