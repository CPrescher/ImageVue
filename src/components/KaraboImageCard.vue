<template>
  <v-card>
    <v-card-title>KaraboVue</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field
            label="Experiment"
            type="number"
            class="mt-0"
            reverse
            v-model="experiment"
          />
        </v-col>
        <v-col>
          <v-text-field
            label="Run"
            type="number"
            class="mt-0"
            reverse
            v-model="run"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0">
          <v-select
            class="pv-0"
            label="Source"
            :items="sources"
            v-model="selectedSource"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <!--          <v-progress-linear height="10" rounded indeterminate v-if="loading" class="mt-4"></v-progress-linear>-->
          <v-progress-circular
            height="10"
            indeterminate
            v-if="loading"
            class="mt-0"
            style="margin: 0 auto;"
          ></v-progress-circular>
        </v-col>
        <v-col>
          <stepper v-model="imageIndex"></stepper>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <label>Width: {{ width }}</label>
        </v-col>
        <v-col>
          <label>Height: {{ height }}</label>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import io from "socket.io-client";
import { NumpyLoader } from "@/lib/numpy-loader";

import stepper from "@/components/stepper";

export default {
  name: "KaraboImageCard",
  data: () => {
    return {
      experiment: 2292,
      run: 358,

      sources: [],
      selectedSource: "",
      trainIDs: [],
      imageIndex: 0,
      loading: 0,

      width: 0,
      height: 0,

      socket: io("localhost:8745")
    };
  },
  mounted() {
    this.openRun();
  },
  watch: {
    run(run) {
      this.openRun();
      console.log(run);
    },
    selectedSource(source) {
      this.loading++;
      let key = "data.image.pixels";
      if (source.includes("DET")) key = "data.adc";
      this.socket.emit("read_data", {
        source: source,
        key
      });
      this.socket.emit("get_frame", this.imageIndex, this.receiveImage);
    },
    imageIndex(index) {
      this.loading++;
      this.socket.emit("get_frame", index, this.receiveImage);
    }
  },
  methods: {
    openRun() {
      this.socket.emit(
          "open_run",
          { proposal: this.experiment, run: this.run },
          this.updateSources
      );
    },

    updateSources(sources) {
      let camSources = [];
      for (let source of sources) {
        if (source.includes("CAM")) camSources.push(source);
        else if (source.includes("DET")) camSources.push(source);
      }
      camSources.sort();
      this.selectedSource = camSources[0];
      this.sources = camSources;
    },
    receiveImage(data) {
      let image = NumpyLoader.fromArrayBuffer(data);
      this.$store.commit("image/updateImage", {
        data: image.data,
        width: image.shape[1],
        height: image.shape[0]
      });
      this.width = image.shape[0];
      this.height = image.shape[1];
      this.loading--;
    },
    readDimension() {}
  },
  components: {
    stepper
  }
};
</script>

<style scoped></style>
