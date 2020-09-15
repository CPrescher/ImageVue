<template>
  <div>
    <v-row class="pa-0 ma-0" style="width: 150px;">
      <v-col class="pa-0 ma-0" cols="3">
        <v-btn class="ma-0 step-button" @click="decrement()">&lt;</v-btn>
      </v-col>
      <v-col class="pa-0 pr-2 pl-2 ma-0" cols="6">
        <v-text-field
          class="pa-0"
          :label="label"
          :value="index"
          reverse
          @change="fieldChanged($event)"
        />
      </v-col>
      <v-col class="pa-0 ma-0" cols="3">
        <v-btn class="ma-0 step-button" @click="increment()">&gt;</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "stepper",
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    label: {
      type: String,
      default: "index"
    }
  },
  data: () => {
    return {
      index: 1
    };
  },
  methods: {
    increment() {
      if (this.index < this.max) this.index++;
      this.notify();
    },
    decrement() {
      if (this.index > this.min) this.index--;
      this.notify();
    },
    fieldChanged(value) {
      value = parseInt(value);
      if (value < this.min) this.index = this.min;
      else if (value > this.max) this.index = this.max;
      else this.index = value;
      this.notify();
    },
    notify() {
      this.$emit("input", this.index);
    }
  }
};
</script>

<style scoped>
>>> .step-button {
  min-width: 32px !important;
}
</style>
