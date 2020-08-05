<template>
  <div>
    <h1>This should hopefully work well!</h1>
    <div id="graph" />
  </div>
</template>

<script>
import ImagePlot from "@/lib/image-plot";
import {
  createRandomImage,
  createAscendingImage
} from "@/lib/image-generation";

export default {
  name: "ImagePlot",
  mounted() {
    this.imagePlot = new ImagePlot("#graph");
    const width = 2048;
    const height = 2048;
    const imageData = createRandomImage(width, height);
    const imageData2 = createAscendingImage(width, height);
    this.imagePlot.plotImage(imageData2, width, height);
    this.imagePlot.plotImage(imageData, width, height);
  }
};
</script>

<style scoped></style>
