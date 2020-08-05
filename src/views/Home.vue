<template>
  <div class="home">
    <image-plot />
  </div>
</template>

<script>
// @ is an alias to /src

import ImagePlot from "@/components/ImagePlot";

export default {
  name: "Home",
  components: { ImagePlot }
};
</script>
