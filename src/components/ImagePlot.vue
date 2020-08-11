<template>
  <v-sheet outlined class="v-sheet pa-0" v-resize="resized" ref="graphSheet">
    <div id="graph" />
  </v-sheet>
</template>

<script>
import _ from "lodash";

import ImagePlot from "@/lib/image-plot";
import { createRandomImage } from "@/lib/image-generation";

export default {
  name: "ImagePlot",
  methods: {
    resized() {
      if (this.imagePlot) {
        this.throttleResize();
      }
    }
  },
  mounted() {
    this.imagePlot = new ImagePlot("#graph", this.$refs.graphSheet.$el.clientWidth, 400, false);
    const imageWidth = 2048;
    const imageHeight = 2048;
    const imageData = createRandomImage(imageWidth, imageHeight);
    this.imagePlot.plotImage(imageData, imageWidth, imageHeight);

    this.throttleResize = _.throttle(() => {
      const width = this.$refs.graphSheet.$el.clientWidth;
      const height = 400;
      this.imagePlot.resize(width, height);
    }, 50);

  }
};
</script>

<style scoped>
#graph {
  z-index: 2;
}

.v-sheet {
  z-index: 1;
  height: 100%;
  width: 100%;
}
</style>
