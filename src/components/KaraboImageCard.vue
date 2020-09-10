<template>
  <v-card>
    <v-card-title>Karabo Image</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field
              label="Experiment"
              type="number"
              class="mt-0"
              reverse
          />
        </v-col>
        <v-col>
          <v-text-field
              label="Run"
              type="number"
              class="mt-0"
              reverse
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col  class="py-0">
          <v-text-field
              class="pv-0"
              label="Source"
              typo="text"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0">
          <v-text-field
              label="Key"
              typo="text"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
name: "KaraboImageCard"
}
</script>

<style scoped>

</style>