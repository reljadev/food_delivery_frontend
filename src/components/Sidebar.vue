<template>
  <aside class="cart-container">
    <div class="cart">
      <h1 class="cart-title spread">
        <span>
          Cart
          <i class="icofont-cart-alt icofont-1x"></i>
        </span>
        <button @click="toggle" class="cart-close">&times;</button>
      </h1>

      <div class="cart-body">
        <table class="cart-table">
          <thead>
            <tr>
              <th><span class="sr-only">Product Image</span></th>
              <th>Meal</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th><span class="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="({meal, quantity}, mealId) in cart_meals" :key="mealId">
              <td><i class="icofont-carrot icofont-3x"></i></td>
              <td>{{ meal.name }}</td>
              <td>${{ meal.price }}</td>
              <td class="center">{{ quantity }}</td>
              <td>${{ (quantity * meal.price).toFixed(2) }}</td>
              <td class="center">
                <button @click="removeMeal(mealId)" class="btn btn-light cart-remove">
                  &times;
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <p class="center" v-if="!Object.keys(cart_meals).length"><em>No items in cart</em></p>
        <div class="spread">
          <span><strong>Total:</strong> ${{ calculateTotal() }}</span>
          <button @click="orderMeals" 
                  :disabled="!Object.keys(cart_meals).length"
                  class="btn btn-light">
            Checkout
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import axios from 'axios';
import { mapState } from "vuex";

export default {
  props: ['toggle'],
  data() {
    return {}
  },
  computed: {
    ...mapState({
      cart_meals: (state) => state.cart_meals
    })
  },
  methods: {
    calculateTotal () {
      let total = 0;

      for(let i in this.cart_meals) {
        let meal = this.cart_meals[i].meal;
        let quantity = this.cart_meals[i].quantity;
        total += meal.price * quantity;
      }

      return total.toFixed(2);
    },
    removeMeal(mealId) {
      this.$store.commit("deleteMeal", mealId);
    },
    async orderMeals() {
      // user has to be logged in to order food
      if(!this.$auth.isAuthenticated) {
        this.$auth.loginWithRedirect();
        return;
      }

      const token = await this.$auth.getTokenSilently();

      // Use Axios to make a call to the API
      let requestURL = "https://apifooddelivery.tk/orders/";
      
      let order = {};
      for(let mealId in this.cart_meals) {
        order[mealId] = this.cart_meals[mealId].quantity;
      }

      let config = {
                  headers: {
                    Authorization: "Bearer " + token
                  }
                };

      // clear shopping cart
      for(let mealId in this.cart_meals) {
        this.$store.commit("deleteMeal", mealId);
      }

      // place an order
      await axios.post(requestURL, order, config);
    }
  }
}
</script>

<style scoped>
.cart-container {
  position: fixed;
  overflow: hidden; }

.cart-container,
.cart {
  top: 0px;
  right: 0px;
  width: 410px;
  height: 100%; }

.cart {
  position: relative;
  background: #001;
  color: #FFF8EA;
  transition: 1s ease right; }
  .cart.hide {
    right: -410px; }

.cart-title {
  align-items: center;
  min-height: 49px;
  max-height: 49px;
  background: #335;
  border-bottom: 1px solid #FFF8EA;
  padding: 0px 15px;
  font-size: 26px; }

.cart-close {
  background: transparent;
  border: 0px;
  border-radius: 3px;
  padding: 0px 13px;
  color: #FCF5D8;
  font-size: 32px;
  font-weight: bold; }
  .cart-close:hover {
    background: #001; }

.cart-table {
  width: 380px;
  border-collapse: collapse;
  margin: 0px;
  font-size: 13px; }

.cart-body {
  max-height: calc(100% - 49px);
  padding: 10px;
  overflow: auto; }

.cart-remove {
  padding: 0px 7px;
  font-size: 20px; }

.icofont-cart-alt:before {
  content: "\eed1";
}

.icofont-carrot:before {
  content: "\eb4b";
}

.icofont-1x {
  font-size: 1em;
}

.icofont-3x {
  font-size: 3em;
}

@keyframes icofont-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  border: 0px;
  margin: -1px;
  padding: 0px;
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
}

.center {
    text-align: center;
}

/* utils */
.spread {
  display: flex;
  justify-content: space-between;
}

.btn {
  border: 0px;
  border-radius: 3px;
  padding: 5px 12px;
  font-weight: bold;
  vertical-align: middle;
}
.btn:active {
  padding: 6px 11px 4px 13px;
}

.btn-light {
  background: #FFF8EA;
  color: #79A206;
}
.btn-light:hover {
  background: #FCF5D8;
  color: #001;
}

</style>