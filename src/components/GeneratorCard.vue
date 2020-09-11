<template>
  <v-card>
    <v-card-title>Image Generator</v-card-title>
    <v-card-text>
      <v-row>
        <v-spacer />
        <v-col md="auto" class="pa-0 ma-0 mr-2">
          <v-btn class="px-2" @click="generateRandomImage">Noise</v-btn>
        </v-col>
      </v-row>
      <v-divider class="my-2" />
      <v-row align="center">
        <v-spacer />
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
            v-model="imageWidth"
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
            v-model="imageHeight"
          />
        </v-col>
      </v-row>
      <v-divider />
      <v-row>
        <v-col>
          <v-btn v-if="!movieRunning" class="px-2" @click="startMovie"
            >Start Movie</v-btn
          >
          <v-btn v-else class="px-2" @click="stopMovie">Stop Movie</v-btn>
        </v-col>
        <v-col>
          <v-container>
            FPS: {{ fps }}
          </v-container>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import _ from "lodash";

export default {
  name: "GeneratorCard",
  data: () => {
    return {
      movieId: 0,
      movieRunning: false,
      fps: 2,
      frameTimes: []
    };
  },
  computed: {
    imageWidth: {
      get() {
        return this.$store.getters["generator/imageWidth"];
      },
      set(value) {
        this.$store.commit("generator/updateImageWidth", value);
        if (this.movieRunning) {
          this.stopMovie();
          this.startMovie();
        }
      }
    },
    imageHeight: {
      get() {
        return this.$store.getters["generator/imageHeight"];
      },
      set(value) {
        this.$store.commit("generator/updateImageHeight", value);
        if (this.movieRunning) {
          this.stopMovie();
          this.startMovie();
        }
      }
    }
  },
  methods: {
    ...mapActions("generator", [
      "generateRandomImage",
      "nextMovieImage",
      "initMovieArray"
    ]),

    startMovie() {
      if (this.movieRunning) return;
      this.movieRunning = true;
      this.initMovieArray();

      let t1 = Date.now()
      this.frameTimes = [];

      this.movieId = setInterval(() => {
        this.nextMovieImage();
        this.frameTimes.push(Date.now() - t1);
        this.fps = Math.floor(10000/_.mean(this.frameTimes))/10;
        if(this.frameTimes.length>100) {
          this.frameTimes.shift();
        }
        t1 = Date.now()
      }, 1);
    },
    stopMovie() {
      this.movieRunning = false;
      clearInterval(this.movieId);
    }
  },
  watch: {
    imageWidth() {
      this.generateRandomImage();
    },
    imageHeight() {
      this.generateRandomImage();
    }
  }
};
</script>

<style></style>
