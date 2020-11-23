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
import { mapGetters } from "vuex";

import ImagePlot from "@/lib/image-plot";

export default {
  name: "ImagePlot",
  methods: {
    resized() {
      if (this.imagePlot) {
        this.throttleResize();
      }
    }
  },
  computed: {
    ...mapGetters({
      imageData: "image/data",
      imageWidth: "image/width",
      imageHeight: "image/height"
    })
  },
  watch: {
    imageData() {
      this.throttlePlotImage();
    }
  },
  mounted() {
    this.imagePlot = new ImagePlot(
      "#graph",
      this.$refs.graphSheet.$el.clientWidth,
      this.$refs.graphSheet.$el.clientHeight,
      false
    );

    this.throttlePlotImage = _.throttle(() => {
      this.imagePlot.plotImage(
        this.imageData,
        this.imageWidth,
        this.imageHeight
      );
    }, 15);

    this.throttleResize = _.throttle(() => {
      const width = this.$refs.graphSheet.$el.clientWidth;
      const height = this.$refs.graphSheet.$el.clientHeight;
      this.imagePlot.resize(width, 200);
      this.imagePlot.resize(width, height);
    }, 50);

    this.throttlePlotImage();
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
