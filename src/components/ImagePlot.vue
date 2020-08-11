<template>
  <div id="graph" />
</template>

<script>
import ImagePlot from "@/lib/image-plot";
import { createRandomImage } from "@/lib/image-generation";

export default {
  name: "ImagePlot",
  mounted() {
    this.imagePlot = new ImagePlot("#graph");
    const width = 2048;
    const height = 2048;
    const imageData = createRandomImage(width, height);
    this.imagePlot.plotImage(imageData, width, height);
  }
};
</script>

<style scoped>
#graph {
  z-index: 2;
}
</style>
