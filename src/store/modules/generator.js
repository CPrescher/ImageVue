import { createRandomImage } from "@/lib/image-generation";

const state = {
  imageWidth: 2048,
  imageHeight: 2048,
  movieImageArray: [],
  movieImageNum: 0,
  movieImageIndex: 0
};

const getters = {
  imageWidth: state => {
    return state.imageWidth;
  },
  imageHeight: state => {
    return state.imageHeight;
  },
  movieImageArray: state => {
    return state.movieImageArray;
  },
  movieImageNum: state => {
    return state.movieImageNum;
  },
  movieImageIndex: state => {
    return state.movieImageIndex;
  }
};

const mutations = {
  initMovieArray: (state, numImages) => {
    state.movieImageNum = numImages;
    state.movieImageArray = new Array(numImages);
    for (let i = 0; i < numImages; i++) {
      state.movieImageArray[i] = createRandomImage(
        state.imageWidth,
        state.imageHeight
      );
    }
  },
  incrementMovieIndex: state => {
    if (state.movieImageIndex < state.movieImageNum - 1) {
      state.movieImageIndex += 1;
    } else {
      state.movieImageIndex = 0;
    }
  },
  updateImageWidth: (state, width) => {
    state.imageWidth = width;
  },
  updateImageHeight: (state, height) => {
    state.imageHeight = height;
  }
};

const actions = {
  initMovieArray: ({ commit }) => {
    commit("initMovieArray", 10);
  },
  generateRandomImage: ({ commit, getters }) => {
    let payload = {
      data: createRandomImage(getters.imageWidth, getters.imageHeight),
      width: getters.imageWidth,
      height: getters.imageHeight
    };
    commit("image/updateImage", payload, { root: true });
  },

  nextMovieImage: ({ commit, getters }, payload) => {
    commit("incrementMovieIndex");
    payload = {
      data: getters.movieImageArray[getters.movieImageIndex],
      width: getters.imageWidth,
      height: getters.imageHeight
    };
    commit("image/updateImage", payload, { root: true });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
