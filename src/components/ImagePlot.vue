<template>
  <v-sheet
    outlined
    class="pa-0"
    v-resize="resized"
    id="image-plot-sheet"
    ref="graphSheet"
  >
    <div id="graph-container">
      <div id="graph" />
    </div>
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
    this.imagePlot = new ImagePlot(
      "#graph",
      this.$refs.graphSheet.$el.clientWidth,
      this.$refs.graphSheet.$el.clientHeight,
      false
    );
    const imageWidth = 2048;
    const imageHeight = 2048;
    const imageData = createRandomImage(imageWidth, imageHeight);
    this.imagePlot.plotImage(imageData, imageWidth, imageHeight);

    this.throttleResize = _.throttle(() => {
      const width = this.$refs.graphSheet.$el.clientWidth;
      const height = this.$refs.graphSheet.$el.clientHeight - 10;
      this.imagePlot.resize(width, 200);
      this.imagePlot.resize(width, height);
      console.log(height);
    }, 50);
  }
};
</script>

<style>
#graph {
  z-index: 2;
}

#image-plot-sheet {
  z-index: 1;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
}

#graph-container {
  position: absolute;
  flex: 1;
  display: flex;
}
</style>
