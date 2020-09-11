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
import { mapGetters } from 'vuex';

import ImagePlot from "@/lib/image-plot";
import { createRandomImage } from '@/lib/image-generation';
// import { createRandomImage } from "@/lib/image-generation";

export default {
  name: "ImagePlot",
  methods: {
    resized() {
      if (this.imagePlot) {
        this.throttleResize();
      }
    },
    startMovie() {
      if (this.movieRunning) return;
      this.movieRunning = true;

      let imageWidth = 2512;
      let imageHeight = 2512;

      let numImages = 10;
      let randomImages = new Array(numImages);
      for (let i = 0; i < numImages; i++) {
        randomImages[i] = createRandomImage(imageWidth, imageHeight);
      }
      let imageInd = 0;

      this.movieId = setInterval(() => {
        this.imagePlot.plotImage(randomImages[imageInd], imageWidth, imageHeight);
        imageInd++;
        if (imageInd === 5) imageInd = 0;
      }, 1);
    },
  },
  computed: {
    ...mapGetters( {
      imageData: 'image/data',
      imageWidth: 'image/width',
      imageHeight: 'image/height'}
      )
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

    this.throttlePlotImage = _.throttle(()=> {
          this.imagePlot.plotImage(this.imageData, this.imageWidth, this.imageHeight);
    },15);

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
