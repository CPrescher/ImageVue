import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { createRandomImage } from '@/lib/image-generation';

export default new Vuex.Store({
  state: {
    imageData: createRandomImage(2048, 2048),
    imageWidth: 2048,
    imageHeight: 2048,
  },
  getters: {
    imageData: state => {
      return state.imageData
    },
    imageWidth: state => {
      return state.imageWidth
    },
    imageHeight: state => {
      return state.imageHeight
    }
  },
  mutations: {
    updateImage: (state, payload) => {
      state.imageData = payload.imageData;
      state.imageWidth = payload.imageWidth;
      state.imageHeight = payload.imageHeight;
    },
  },
  actions: {
    generateRandomImage: ({ commit }, payload) => {
      payload.imageData = createRandomImage(payload.imageWidth, payload.imageHeight);
      commit('updateImage', payload);
    }
  },
  modules: {}
});
