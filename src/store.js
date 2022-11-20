import Vue from 'vue';
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cityId: null,
    cart_meals: {},
  },

  mutations: {
    updateCity(state, id) {
      state.cityId = id;
    },

    addMeal(state, payload) {
      // NOTE: I have to use Vue.set in order to not break reactivity. It may not
      // be the most efficient, but cart_meals will never be a big object anyway
      Vue.set(state.cart_meals, payload.id, {meal: payload.meal, quantity: 0});
    },

    incrementMeal(state, id) {
      state.cart_meals[id].quantity++;
    },

    decrementMeal(state, id) {
      state.cart_meals[id].quantity--;
    },

    deleteMeal(state, id) {
      Vue.delete(state.cart_meals, id);
    }
  }

});
