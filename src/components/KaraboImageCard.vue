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
        <v-spacer />
        <stepper v-model="imageIndex"></stepper>
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

      width: 0,
      height: 0,

      socket: io("localhost:8745")
    };
  },
  mounted() {
    this.socket.emit(
      "open_run",
      { proposal: this.experiment, run: this.run },
      this.updateSources
    );
  },
  watch: {
    selectedSource(source) {
      this.socket.emit(
        "read_data",
        { source: source, key: "data.image.pixels" },
        this.receiveImage
      );
    },
    imageIndex(index) {
      this.socket.emit("get_frame", index, this.receiveImage);
    }
  },
  methods: {
    updateSources(sources) {
      let camSources = [];
      for (let source of sources) {
        if (source.includes("CAM")) camSources.push(source);
      }
      camSources.sort();
      this.selectedSource = camSources[0];
      this.sources = camSources;
    },
    receiveImage(data) {
      let image = NumpyLoader.fromArrayBuffer(data);
      this.$store.commit("image/updateImage", {
        data: image.data,
        width: image.shape[0],
        height: image.shape[1]
      });
      this.width = image.shape[0];
      this.height = image.shape[1];
    },
    readDimension() {}
  },
  components: {
    stepper
  }
};
</script>

<style scoped></style>
