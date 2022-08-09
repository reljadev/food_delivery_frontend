<template>
  <div>
    <b-navbar v-if="$route.name !== 'Not Found'" toggleable="lg" type="dark" variant="dark">

      <b-collapse id="nav-collapse" is-nav>

        <!-- Left aligned nav items -->
        <b-navbar-nav>
          <b-nav-item to="/restaurants">Restaurants</b-nav-item>
          <b-nav-item to="/about">About us</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav v-if="!$auth.loading" class="ml-auto">

          <!-- Shopping cart -->
          <b-nav-item @click="toggleSidebar">
            <font-awesome-icon icon="fa-solid fa-cart-shopping" />
            ({{ totalQuantity }})
          </b-nav-item>

          <!-- Before user logs in -->
          <div v-if="!$auth.isAuthenticated">
            <!-- show sign up when not authenticated -->
            <b-button @click="signup">Sign up</b-button>
            <!-- show login when not authenticated -->
            <b-button @click="login" class="login_button">Log in</b-button>
          </div>

          <!-- After user logs in -->
          <div v-if="$auth.isAuthenticated">
            <b-dropdown size="sm"  variant="link" 
                        toggle-class="text-decoration-none" right no-caret>
              <template #button-content>
                <img :src="$auth.user.picture" style="width: 32px;"/>
              </template>

              <b-dropdown-item to="/profile">My profile</b-dropdown-item>
              <b-dropdown-item to="/orders">My orders</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="logout">Log out</b-dropdown-item>
            </b-dropdown>
          </div>

        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <router-view></router-view>
  
  <!-- Meals to order -->
  <Sidebar
    v-if="showSidebar"
    :toggle="toggleSidebar"
  />
  
  </div>  
  
</template>


<script>
import Sidebar from './components/Sidebar.vue';
import store from './store.js';

export default {
  components: { Sidebar },
  data() {
      return {
          showSidebar: false,
      }
  },
  computed: {
    totalQuantity() {
      let total = 0;
      
      for(let i in store.cart_meals) {
        total += store.cart_meals[i].quantity;  
      }

      return total;
    }
  },
  methods: {
    // Sign up user
    signup() {
        this.$auth.loginWithRedirect({ action: "signup" });
    },
    // Log the user in
    login() {
        this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
        this.$auth.logout({
            returnTo: window.location.origin
        });
    },
    toggleSidebar() {
        this.showSidebar = !this.showSidebar;
    },
  }
}
</script>

<style scoped>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

.login_button {
  margin-left: 4px;
  background-color: transparent;
  border-color: transparent;
}

</style>
