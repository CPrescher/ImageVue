<template>
  <v-card>
    <v-card-title>Image Generator</v-card-title>
    <v-card-text>
      <v-row>
        <v-spacer/>
        <v-col md="auto" class="pa-0 ma-0 mr-2">
          <v-btn class="px-2" @click="generateRandomImage">Noise</v-btn>
        </v-col>
        <v-col md="auto" class="pa-0 ma-0">
          <v-btn class="px-2">Gaussian</v-btn>
        </v-col>
      </v-row>
      <v-divider class="my-2"/>
      <v-row class="m">
        <v-spacer/>
        <v-col md="auto" class="pa-1">
          <v-btn x-small class="pa-1"
          >
            <v-icon small>mdi-arrow-left</v-icon>
          </v-btn
          >
        </v-col>

        <v-col md="auto" class="pa-1">
          <v-btn x-small class="pa-1"
          >
            <v-icon small>mdi-arrow-right</v-icon>
          </v-btn
          >
        </v-col>

        <v-col md="auto" class="pa-1">
          <v-btn x-small class="pa-1"
          >
            <v-icon small>mdi-arrow-up</v-icon>
          </v-btn
          >
        </v-col>

        <v-col md="auto" class="pa-1">
          <v-btn x-small class="pa-1"
          >
            <v-icon small>mdi-arrow-down</v-icon>
          </v-btn
          >
        </v-col>
      </v-row>
      <v-divider class="my-2"/>

      <v-row align="center">
        <v-spacer/>
        <v-col md="auto" class="pa-1">
          Dim:
        </v-col>
        <v-col class="pa-1">
          <v-text-field
              label="X"
              type="number"
              step="100"
              class="mt-0"
              reverse
              v-model="xDim"
          />
        </v-col>
        <v-col md="auto" class="pa-1">
          <v-icon>mdi-minus</v-icon>
        </v-col>
        <v-col class="pa-1">
          <v-text-field
              label="Y"
              type="number"
              step="100"
              class="mt-0"
              reverse
              v-model="yDim"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
// import { mapActions } from 'vuex';

export default {
  name: 'GeneratorCard',
  data () {
    return {
      xDim: 2048,
      yDim: 2048
    };
  },
  watch: {
    xDim () {
      this.generateRandomImage()
    },
    yDim () {
      this.generateRandomImage()
    }
  },
  methods: {
    generateRandomImage() {
      this.$store.dispatch('generateRandomImage', { imageWidth: this.xDim, imageHeight: this.yDim })
    },
  }
};
</script>

<style></style>
