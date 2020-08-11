<template>
  <v-row>
    <v-col class="col-3">
      <GeneratorCard></GeneratorCard>
    </v-col>
    <v-col class="d-flex justify-center" cols="6">
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

<style scoped></style>
