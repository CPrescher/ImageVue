<template>
  <v-card>
    <v-card-title>Image Generator</v-card-title>
    <v-card-text>
      <v-row>
        <v-spacer/>
        <v-col md="auto" class="pa-0 ma-0 mr-2">
          <v-btn class="px-2" @click="generateRandomImage">Noise</v-btn>
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
      <v-divider/>
      <v-row>
        <v-col>
          <v-btn v-if="!moviePlaying" class="px-2" @click="startMovie">Start Movie</v-btn>
          <v-btn v-else class="px-2" @click="stopMovie">Stop Movie</v-btn>
        </v-col>
        <v-col>
          <v-text-field
              label="FPS"
              type="number"
              step="5"
              class="mt-0"
              reverse
              v-model="fps"
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
      yDim: 2048,
      moviePlaying: false,
      movieInterval: 1,
      fps: 20
    };
  },
  watch: {
    xDim () {
      this.generateRandomImage()
    },
    yDim () {
      this.generateRandomImage()
    },
    fps () {
      if(this.moviePlaying) {
        this.stopMovie();
        this.startMovie();
      }
    }
  },
  methods: {
    generateRandomImage () {
      this.$store.dispatch('image/generateRandomImage', { width: this.xDim, height: this.yDim })
    },
    startMovie () {
      if (this.moviePlaying) return;
      this.moviePlaying = true;
      this.movieInterval = setInterval(() => {
        this.generateRandomImage();
      }, 1/this.fps*1000)
    },
    stopMovie () {
      if (!this.moviePlaying) return;
      this.moviePlaying = false;
      clearInterval(this.movieInterval);
    }
  },
};
</script>

<style></style>
