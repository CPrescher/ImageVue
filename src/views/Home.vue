<template>
  <v-row class="home-row">
    <v-col cols="3">
      <GeneratorCard></GeneratorCard>
    </v-col>
    <v-col  cols="9">
      <image-plot />
    </v-col>
  </v-row>
</template>

<script>
import ImagePlot from "@/components/ImagePlot";
import GeneratorCard from "@/components/GeneratorCard";

export default {
  name: "Home",
  components: { GeneratorCard, ImagePlot }
};
</script>

<style>
.home-row {
  height: 100%;
}
</style>
