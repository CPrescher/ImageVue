<template>
  <v-app>
    <TopNav />
    <v-main class="pa-3 v-main main">
      <v-container style="height: 100%;">
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

<style>
html {
  overflow-y: hidden;
}

.v-main {
  flex: 1 1 auto;
  max-height: 100%;
}

.v-container {
  height: 100%;
}
</style>
