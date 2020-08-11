<template>
  <v-card>
    <v-card-title>Image Generator</v-card-title>
    <v-card-text>
      <v-btn>Noise</v-btn>
      <v-btn>Gaussian</v-btn>
      <v-divider></v-divider>
      <v-btn>left</v-btn>
      <v-btn>right</v-btn>
      <v-btn>top</v-btn>
      <v-btn>down</v-btn>
      <v-divider />

      <v-row>
        <v-col md="auto">
          Dimensions:
        </v-col>
        <v-col md="auto">
          <v-text-field label="X" type="number" reverse v-model="xDim" />
        </v-col>
        <v-col md="auto">X</v-col>
        <v-col md="auto">
          <v-text-field label="Y" type="number" reverse v-model="yDim" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "GeneratorCard",
  data() {
    return {
      xDim: 2048,
      yDim: 2048
    };
  }
};
</script>

<style scoped></style>
