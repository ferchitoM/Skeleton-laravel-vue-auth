<template>
   <main>
      <section class="container-prod">
         <aside class="resume-list">
            <article
               v-for="res in resume_prods"
               :key="'res' + res.id"
               @click="resumen(res.letra)"
               :style="{ 'background-color': res.color }"
            >
               <span>{{ res.letra }}</span>
            </article>
         </aside>
         <section class="products" id="scroll">
            <div class="busqueda">
               <div class="input-field">
                  <i class="material-icons prefix" @click="filtrar">search</i>
                  <input
                     v-model="search"
                     @keyup="filtrar"
                     placeholder="BUSCAR PRODUCTOS"
                  />
               </div>
            </div>

            <div class="product-list">
               <article
                  class="prod"
                  v-for="p in mostrar_productos"
                  :key="'pro' + p.code"
                  :class="{ selected: p.selected }"
                  @click="insertar(p.id)"
               >
                  <p class="codigo">{{ p.code }}</p>
                  <p class="top" :style="{ opacity: p.top }">
                     <i class="material-icons prefix">star</i>
                  </p>
                  <p class="cantidad" :class="{ selected: p.selected }">
                     {{ p.amount }}
                  </p>
                  <div class="marco-img">
                     <!-- Si el producto está agotado -->
                     <img
                        class="agotado"
                        v-if="p.stock == 0"
                        :src="`${axios.defaults.baseURL}/storage/products/agotado.png`"
                     />
                     <!-- Si quedan pocas unidades -->
                     <img
                        class="agotado"
                        v-if="p.stock > 0 && p.stock < 5"
                        :src="`${axios.defaults.baseURL}/storage/products/quedan-pocos.png`"
                     />
                     <div
                        class="img-prod"
                        v-if="p.image"
                        :style="{
                           'background-image': `url('${axios.defaults.baseURL}/storage/products/${p.image}')`,
                        }"
                     ></div>
                     <div
                        class="img-prod"
                        v-if="!p.image"
                        :style="{
                           'background-image': `url('${axios.defaults.baseURL}/storage/products/default.png')`,
                        }"
                     ></div>
                     <p class="inventario">Inv {{ p.stock }}</p>
                  </div>
                  <p class="nombre">{{ p.name }}</p>
                  <p class="precio">{{ formatoMoneda(p.price) }}</p>
               </article>
            </div>
         </section>
         <section class="cart">
            <div class="titulo-factura">
               FACTURA DE VENTA
               <div class="dentado"></div>
            </div>
            <section class="cabecera">
               <div class="input-field">
                  <small>Fecha</small>
                  <small>11.11.2022</small>
               </div>
               <div class="input-field">
                  <small>N. factura</small>
                  <small># NOV-0123</small>
               </div>
               <div class="input-field">
                  <small>Subtotal</small>
                  <small>{{ formatoMoneda(this.factura.subtotal) }}</small>
               </div>
               <div class="input-field">
                  <small>Iva</small>
                  <small>{{ formatoMoneda(this.factura.iva) }}</small>
               </div>
            </section>

            <div class="item-container">
               <table>
                  <tbody>
                     <tr
                        v-for="item in factura.articulos"
                        :key="'item' + item.id"
                     >
                        <td class="item-prod">
                           <span class="nombre">{{ item.name }}</span>
                           <div class="grupo">
                              <span class="precio">
                                 {{ formatoMoneda(item.price) }}
                                 <small class="codigo"
                                    >Cod. {{ item.code }}</small
                                 >
                              </span>
                              <div class="eliminar">
                                 <i
                                    class="material-icons"
                                    @click="eliminar(item.id)"
                                    >delete</i
                                 >
                              </div>
                           </div>
                        </td>
                        <td class="botones-cantidad">
                           <p class="b-menos" @click="sumar(item.id)">
                              <span class="material-symbols-outlined">
                                 expand_less
                              </span>
                           </p>
                           <p class="cantidad">{{ item.amount }}</p>
                           <p class="b-mas" @click="restar(item.id)">
                              <span class="material-symbols-outlined">
                                 expand_more
                              </span>
                           </p>
                        </td>
                        <td class="totales">
                           <span>{{ formatoMoneda(item.total) }}</span>
                           <small class="subtotal">{{
                              formatoMoneda(item.subtotal)
                           }}</small>
                           <small class="iva">{{
                              formatoMoneda(item.iva)
                           }}</small>
                        </td>
                        <td class="titulos">
                           <small>Total</small>
                           <small>Subtotal</small>
                           <small>Iva</small>
                        </td>
                     </tr>

                     <!-- Lista de productos agotados que estaban en el carrito -->
                     <tr
                        class="producto-agotado"
                        v-for="item in lista_agotados"
                        :key="'agotados' + item.id"
                     >
                        <img
                           :src="`${axios.defaults.baseURL}/storage/products/agotado.png`"
                        />
                        <td class="item-prod">
                           <span class="nombre">{{ item.name }}</span>
                           <div class="grupo">
                              <span class="precio">
                                 {{ formatoMoneda(item.price) }}
                                 <small class="codigo"
                                    >Cod. {{ item.code }}</small
                                 >
                              </span>
                              <div class="eliminar">
                                 <i
                                    class="material-icons"
                                    @click="eliminar_agotado(item.id)"
                                    >delete</i
                                 >
                              </div>
                           </div>
                        </td>
                        <td class="botones-cantidad">
                           <p class="b-menos">
                              <span class="material-symbols-outlined">
                                 expand_less
                              </span>
                           </p>
                           <p class="cantidad">{{ item.amount }}</p>
                           <p class="b-mas">
                              <span class="material-symbols-outlined">
                                 expand_more
                              </span>
                           </p>
                        </td>
                        <td class="totales">
                           <span>{{ formatoMoneda(item.total) }}</span>
                           <small class="subtotal">{{
                              formatoMoneda(item.subtotal)
                           }}</small>
                           <small class="iva">{{
                              formatoMoneda(item.iva)
                           }}</small>
                        </td>
                        <td class="titulos">
                           <small>Total</small>
                           <small>Subtotal</small>
                           <small>Iva</small>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>

            <div class="pie">
               <div class="vender" @click="confirmar_venta()">
                  <span>VENDER</span>
                  <span class="total">{{ formatoMoneda(factura.total) }}</span>
               </div>
               <div class="cantidad">
                  <span class="cant-prod"
                     >{{ factura.articulos.length }} PRODUCTOS</span
                  >
                  <span class="cancelar" @click="cancelar_factura()"
                     >CANCELAR</span
                  >
               </div>
            </div>
         </section>
      </section>
      <!-- Modal -->
      <div
         class="modal fade"
         id="confirmarVenta"
         data-bs-backdrop="static"
         data-bs-keyboard="false"
         tabindex="-1"
         aria-labelledby="staticBackdropLabel"
         aria-hidden="true"
      >
         <div class="modal-dialog">
            <div class="modal-content">
               <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">
                     Ejemplo Confirmar Venta
                  </h1>
                  <button
                     type="button"
                     class="btn-close"
                     data-bs-dismiss="modal"
                     aria-label="Close"
                  ></button>
               </div>
               <div class="modal-body">Pasarela de pagos...</div>
               <div class="modal-footer">
                  <button
                     type="button"
                     class="btn btn-secondary"
                     data-bs-dismiss="modal"
                  >
                     Close
                  </button>
                  <button
                     type="button"
                     class="btn btn-primary"
                     @click="vender()"
                  >
                     Confirmar
                  </button>
               </div>
            </div>
         </div>
      </div>
   </main>
</template>

<style scoped>
@import "@/assets/css/shopping.css";
</style>

<script>
import { helpers } from "@/assets/js/helpers";

export default {
   mixins: [helpers],
   data() {
      return {
         user: {},
         lista_productos: [],
         mostrar_productos: [],
         resume_prods: [],
         lista_agotados: [],
         factura: {
            articulos: [],
         },
         cliente: null,
         search: "",
         modal_crearProd: null,
         nuevo_producto: null,
         errors: [],
         modal: null,
      };
   },

   mounted() {
      if (!localStorage.token) {
         this.$router.push({
            name: "Login",
            params: {
               message: "No estas autorizado para acceder a esta cuenta",
            },
         });
      }

      console.log(localStorage.token);

      this.token = localStorage.token;
      this.user = JSON.parse(localStorage.user);

      // Configuramos la factura
      this.factura = {
         users_id: this.user.id,
         date: new Date().toISOString().slice(0, 10),
         number: 0,
         iva: 0,
         subtotal: 0,
         total: 0,
         articulos: [], //Los articulos del carrito
      };

      this.get_products();

      //Launch database changes verification
      clearInterval(this.timer);
      this.timer = setInterval(() => {
         this.db_changes();
      }, 10000);
   },

   methods: {
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

      async get_products() {
         try {
            const res = await this.axios.get("/api/products", {
               headers: { Authorization: "Bearer " + localStorage.token },
            });
            this.lista_productos = res.data.product_list;
            this.lista_productos.map((item) => (item.selected = false));
            this.mostrar_productos = this.lista_productos;
            this.resume_prods = this.make_resume(this.lista_productos);
         } catch (e) {
            this.manage_error_messages(e);
         }
      },

      confirmar_venta() {
         if (this.factura.total > 0) {
            const myModal = document.getElementById("confirmarVenta"); //Nombre del modal
            this.modal = new bootstrap.Modal(myModal);
            this.modal.show();
         }
      },

      async vender() {
         console.log(this.factura);

         let factura_copy = JSON.parse(JSON.stringify(this.factura));
         //Enviamos los articulos como JSON
         factura_copy.articulos = JSON.stringify(factura_copy.articulos);

         try {
            const res = await this.axios.post(
               "/api/shopping/newsale",
               factura_copy,
               {
                  headers: { Authorization: "Bearer " + localStorage.token },
               }
            );

            console.log(res.data);
            this.modal.hide();
            clearInterval(this.timer);

            this.$router.push({
               name: "mysales",
               params: {
                  message: "Felicitaciones!, tu venta se realizó exitosamente.",
               },
            });
         } catch (e) {
            this.manage_error_messages(e);
         }
      },

      cancelar_factura() {
         // Reiniciamos la factura
         this.factura = {
            users_id: this.user.id,
            date: new Date().toISOString().slice(0, 10),
            number: 0,
            iva: 0,
            subtotal: 0,
            total: 0,
            articulos: [], //Borramos los articulos del carrito
         };

         this.lista_agotados = [];
         this.lista_productos.forEach((item) => (item.selected = false));
      },

      insertar(id_buscar) {
         let item = this.lista_productos.find((pro) => pro.id == id_buscar);
         let existe = this.factura.articulos.find((pro) => pro.id == item.id);

         //Si el producto no está en el carrito y tiene stock
         if (existe == undefined && item.stock > 0) {
            this.factura.articulos.push(item);
            item.selected = true;

            //Configuramos el producto como en la base de datos
            item.products_id = item.id;
            item.amount = 1;
            item.total = item.amount * item.price;
            item.subtotal = item.total / 1.19; //valor sin iva
            item.iva = item.total - item.subtotal; //solo iva

            this.factura.total += item.total;
            this.factura.subtotal += item.subtotal;
            this.factura.iva += item.iva;
         }
      },

      sumar(id_buscar) {
         let item = this.factura.articulos.find((pro) => pro.id == id_buscar);

         if (item.amount < item.stock) {
            //Restamos los valores anteriores de la factura
            this.factura.total -= item.total;
            this.factura.subtotal -= item.subtotal;
            this.factura.iva -= item.iva;

            //Recalculamos valores
            item.amount++;
            item.total = item.amount * item.price;
            item.subtotal = item.total / 1.19; //valor sin iva
            item.iva = item.total - item.subtotal; //solo iva

            //Volvemos a sumar a la factura
            this.factura.total += item.total;
            this.factura.subtotal += item.subtotal;
            this.factura.iva += item.iva;
         }
      },

      restar(id_buscar) {
         let item = this.factura.articulos.find((pro) => pro.id == id_buscar);
         if (item.amount > 1) {
            //Restamos los valores anteriores de la factura
            this.factura.total -= item.total;
            this.factura.subtotal -= item.subtotal;
            this.factura.iva -= item.iva;

            //Recalculamos valores
            item.amount--;
            item.total = item.amount * item.price;
            item.subtotal = item.total / 1.19; //valor sin iva
            item.iva = item.total - item.subtotal; //solo iva

            //Volvemos a sumar a la factura
            this.factura.total += item.total;
            this.factura.subtotal += item.subtotal;
            this.factura.iva += item.iva;
         }
      },

      eliminar(id_buscar) {
         let item_index = null;
         let item = this.factura.articulos.find((pro, index) => {
            if (pro.id == id_buscar) {
               item_index = index;
               return true;
            }
         });

         if (item) {
            //Restamos los valores anteriores de la factura
            this.factura.total -= item.total;
            this.factura.subtotal -= item.subtotal;
            this.factura.iva -= item.iva;

            //Eliminamos el articulo de la factura
            this.factura.articulos.splice(item_index, 1);

            //Cambiamos el estilo css
            item.selected = false;
         }
      },

      filtrar() {
         this.mostrar_productos = this.lista_productos.filter(
            (pro) =>
               (pro.name.toLowerCase().indexOf(this.search.toLowerCase()) >
                  -1) |
               (pro.code.toString().indexOf(this.search) > -1)
         );
      },

      resumen(letra) {
         this.mostrar_productos = this.lista_productos.filter(
            (pro) => pro.name.toLowerCase().indexOf(letra.toLowerCase()) == 0
         );
      },

      //Verifica si un producto agotó su stock
      async db_changes() {
         console.log("updating list...");
         try {
            const res = await this.axios.get("/api/products", {
               headers: { Authorization: "Bearer " + localStorage.token },
            });

            let lista_actualizada = res.data.product_list;
            let producto = null;

            lista_actualizada.forEach((prod_actualizado) => {
               producto = this.lista_productos.find(
                  (p) => p.id == prod_actualizado.id
               );

               if (producto) {
                  if (producto.stock != prod_actualizado.stock) {
                     //Actualizamos el stock
                     producto.stock = prod_actualizado.stock;

                     //Si el producto está en el carrito lo eliminamos
                     if (producto.stock == 0) {
                        //Creamos una lista de agotados
                        this.lista_agotados.push(producto);

                        this.eliminar(producto.id);
                     }

                     console.log("product changed: " + producto.name);
                  }
               }
               producto = null;
            });
         } catch (e) {
            this.manage_error_messages(e);
         }
      },

      eliminar_agotado(id_buscar) {
         let item_index = null;
         let item = this.lista_agotados.find((pro, index) => {
            if (pro.id == id_buscar) {
               item_index = index;
               return true;
            }
         });

         if (item) {
            this.lista_agotados.splice(item_index, 1);
         }
      },
   },
};
</script>
