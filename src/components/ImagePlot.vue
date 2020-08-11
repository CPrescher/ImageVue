<template>
  <v-sheet outlined class="v-sheet">
    <div id="graph" />
  </v-sheet>
</template>

<script>
import ImagePlot from "@/lib/image-plot";
import { createRandomImage } from "@/lib/image-generation";

export default {
  name: "ImagePlot",
  mounted() {
    this.imagePlot = new ImagePlot("#graph");
    const imageWidth = 2048;
    const imageHeight = 2048;
    const imageData = createRandomImage(imageWidth, imageHeight);
    this.imagePlot.plotImage(imageData, imageWidth, imageHeight);
  }
};
</script>

<style scoped>
#graph {
  z-index: 2;
}

.v-sheet {
  z-index: 1;
}
</style>
