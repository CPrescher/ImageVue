<template>
  <v-row class="home-row">
    <v-col cols="3">
      <v-row class="mt-2">
        <KaraboImageCard />
      </v-row>
      <v-row class="mt-2">
        <GeneratorCard></GeneratorCard>
      </v-row>
    </v-col>
    <v-col cols="9">
      <image-plot />
    </v-col>
  </v-row>
</template>

<script>
import ImagePlot from "@/components/ImagePlot";
import GeneratorCard from "@/components/GeneratorCard";
import KaraboImageCard from "@/components/KaraboImageCard";

export default {
  name: "Home",
  components: { KaraboImageCard, GeneratorCard, ImagePlot }
};
</script>

<style>
.home-row {
  height: 100%;
}
</style>
