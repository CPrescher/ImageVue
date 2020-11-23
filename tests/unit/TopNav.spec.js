import { shallowMount } from "@vue/test-utils";
import TopNav from "@/components/TopNav.vue";
import { expect } from "chai";

describe("TopNav Display stuff", () => {
  it("renders correct application title", () => {
    const wrapper = shallowMount(TopNav);
    expect(wrapper.text()).to.contain("ImageVue");
  });
});
