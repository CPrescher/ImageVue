import { createRandomImage } from '@/lib/image-generation';

const state = {
  data: createRandomImage(2048, 2048),
  width: 2048,
  height: 2048
};

const getters = {
  data: state => {
    return state.data;
  },
  width: state => {
    return state.width;
  },
  height: state => {
    return state.height;
  }
};

const mutations = {
  updateImage: (state, payload) => {
    state.data = payload.data;
    state.width = payload.width;
    state.height = payload.height;
  },
};

const actions = {
  generateRandomImage: ({ commit }, payload) => {
    payload.imageData = createRandomImage(payload.imageWidth, payload.imageHeight);
    commit('updateImage', payload);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}