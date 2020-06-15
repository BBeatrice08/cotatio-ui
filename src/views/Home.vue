<template>
  <div class="home">
    <search-dialog v-model="openSearchDialog" />
    <div class="display-1 ma-12 pb-6 text-center">
      Cotatio
      <v-icon>copyright</v-icon>
    </div>
    <p class="text-center">
      Pour commencer, créer une machine, une cotation, en retrouver une, etc...
      <br>
      <v-btn class="mt-6" color="info" @click="openSearchDialog = true">Cliquer ici</v-btn>
    </p>
  </div>
</template>

<script>
import SearchDialog from "@/components/SearchDialog";

export default {
  name: 'Home',
  mounted () {
  },
  data : () => ({
    openSearchDialog: false,
  }),
  components: {
    SearchDialog,
  },
};
</script>
