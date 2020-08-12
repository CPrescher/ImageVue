<template>
  <v-app>
    <TopNav />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TopNav from "@/components/TopNav";

export default {
  name: "App",

  components: { TopNav },

  data: () => ({
    //
  })
};
</script>

<style lang="scss">
html {
  overflow-y: hidden;
}
</style>
