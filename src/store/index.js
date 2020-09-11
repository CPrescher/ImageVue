import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import image from './modules/image';
import generator from './modules/generator';

export default new Vuex.Store({
  modules: {
    image,
    generator
  }
});
