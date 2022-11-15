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
                  <small>$ 0,00</small>
               </div>
               <div class="input-field">
                  <small>Iva</small>
                  <small>$ 0,00</small>
               </div>
            </section>

            <div class="item-container">
               <table>
                  <tbody>
                     <tr v-for="item in item_factura" :key="'item' + item.id">
                        <td class="item-prod">
                           <span class="nombre">{{ item.name }}</span>
                           <span class="precio">
                              {{ formatoMoneda(item.price) }}
                              <small class="codigo">Cod. {{ item.code }}</small>
                           </span>
                        </td>
                        <td class="botones-cantidad">
                           <p class="b-menos" @click="restar(item.id)">-</p>
                           <p class="cantidad">{{ item.amount }}</p>
                           <p class="b-mas" @click="sumar(item.id)">+</p>
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
                        <td class="eliminar">
                           <i class="material-icons" @click="eliminar(item.id)"
                              >delete</i
                           >
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>

            <div class="pie">
               <div class="vender">
                  <span>VENDER</span>
                  <span class="total">{{ formatoMoneda(factura.total) }}</span>
               </div>
               <div class="cantidad">
                  <span class="cant-prod"
                     >{{ item_factura.length }} PRODUCTOS</span
                  >
                  <span>CANCELAR</span>
               </div>
            </div>
         </section>
      </section>
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
         lista_productos: [],
         mostrar_productos: [],
         item_factura: [],
         resume_prods: [],
         factura: null,
         cliente: null,
         search: "",
         modal_crearProd: null,
         nuevo_producto: null,
         errors: [],
      };
   },
   mounted() {
      console.log(localStorage.token);
      this.get_products();
   },

   created() {
      this.errors["nuevo_prod"] = {
         precio: "",
         codigo: "",
         nombre: "",
         inventario: "",
      };
      this.errors["nuevo_cliente"] = {};

      this.nuevo_producto = {
         precio: "",
         codigo: "",
         nombre: "",
         top: 0,
         imagen: "default.png",
         inventario: "",
      };

      this.cliente = {
         doc: "",
         nombre: "",
      };

      this.factura = {
         fecha: "",
         hora: "",
         numero: 1,
         doc_cliente: this.cliente.doc,
         nombre_cliente: this.cliente.nombre,
         iva: 0,
         bruto: 0,
         total: 0,
      };

      this.lista_productos = [
         {
            precio: 100000,
            codigo: 52020,
            nombre: "Pro x-100 - Ryzen 5 3600",
            top: 1,
            imagen: "gamer1.jpg",
            inventario: 51,
         },
         {
            precio: 150000,
            codigo: 454525,
            top: 0,
            nombre: "High Tech - Ryzen 5 3600",
            imagen: "gamer2.jpg",
            inventario: 42,
         },
         {
            precio: 160000,
            codigo: 98754,
            top: 1,
            nombre: "Hirez - Ryzen 5 3600",
            imagen: "gamer3.jpg",
            inventario: 74,
         },
         {
            precio: 120000,
            codigo: 87452,
            top: 0,
            nombre: "Ultrakill - Ryzen 5 3600",
            imagen: "gamer4.jpg",
            inventario: 76,
         },
         {
            precio: 110000,
            codigo: 55211,
            top: 0,
            nombre: "Maxproz - Ryzen 5 3600",
            imagen: "gamer1.jpg",
            inventario: 7,
         },
         {
            precio: 115000,
            codigo: 987872,
            nombre: "Sizen-T - Ryzen 5 3600",
            top: 1,
            imagen: "gamer1.jpg",
            inventario: 7,
         },
         {
            precio: 180000,
            codigo: 987541,
            top: 0,
            nombre: "UHD - Ryzen 5 3600",
            imagen: "gamer2.jpg",
            inventario: 5,
         },
         {
            precio: 150000,
            codigo: 785421,
            top: 0,
            nombre: "Xpu-50 - Ryzen 5 3600",
            imagen: "gamer3.jpg",
            inventario: 25,
         },
         {
            precio: 130000,
            codigo: 125544,
            top: 1,
            nombre: "Sacntum - Ryzen 5 3600",
            imagen: "gamer4.jpg",
            inventario: 5,
         },
         {
            precio: 140000,
            codigo: 465546,
            top: 1,
            nombre: "Aurora Lux - Ryzen 5 3600",
            imagen: "gamer1.jpg",
            inventario: 45,
         },
      ];
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
      insertar(id_buscar) {
         let item = this.mostrar_productos.find((pro) => pro.id == id_buscar);
         let existe = this.item_factura.find((pro) => pro.id == item.id);

         if (existe == undefined) {
            this.item_factura.push(item);
            item.selected = true;
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
         let item = this.item_factura.find((pro) => pro.id == id_buscar);

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
         let item = this.item_factura.find((pro) => pro.id == id_buscar);
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
         this.item_factura.forEach((item, index) => {
            if (item.id == id_buscar) {
               //Restamos los valores anteriores de la factura
               this.factura.total -= item.total;
               this.factura.subtotal -= item.subtotal;
               this.factura.iva -= item.iva;

               this.item_factura.splice(index, 1);
            }
         });

         let item = this.mostrar_productos.find((pro) => pro.id == id_buscar);
         item.selected = false;
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
   },
};
</script>
