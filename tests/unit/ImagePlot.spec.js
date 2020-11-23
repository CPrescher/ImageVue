import { shallowMount } from "@vue/test-utils";
import TopNav from "@/components/TopNav.vue";

describe("ImagePlot", () => {
  it("actually loads something", () => {
    const wrapper = shallowMount(TopNav);
    console.log(wrapper.text());
    // expect(wrapper.text()).to.contain("ImageVue");
  });
});
