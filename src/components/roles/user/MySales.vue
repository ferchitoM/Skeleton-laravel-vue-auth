<template>
   <div>
      {{ message }}
   </div>
</template>
<script>
export default {
   data() {
      return {
         message: null,
      };
   },
   mounted() {
      if (this.$route.params.message) this.message = this.$route.params.message;
   },
};
</script>
