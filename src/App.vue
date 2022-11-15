<template>
   <div class="app-container">
      <router-view name="NavBar"> </router-view>

      <div class="app-subcontainer">
         <router-view name="Aside" v-slot="{ Component }">
            <transition name="fade" mode="out-in">
               <component :is="Component" />
            </transition>
         </router-view>
         <!-- component default -->
         <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
               <component :is="Component" />
            </transition>
         </router-view>
      </div>
   </div>
</template>

<style lang="css">
@import "@/assets/css/app.css";
@import "@/assets/css/vue-transitions.css";
</style>
