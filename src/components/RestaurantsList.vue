<template>
  <b-container>
    <div class="container">
      <div class="cards_container">
        <b-card v-for="(restaurant, i) in this.restaurants" v-bind:key="restaurant.id"
          :title="restaurant.name"
          class="mb-2">
          <!-- NOTE: in next iteration of code we should store images on backend
                      instead of in assets -->
            <b-card-img-lazy 
              :src="require(`@/assets/img/restaurant_covers/${food_imgs[i]}`)"
              offset="0"
              blank-src="../assets/img/placeholder.jpg"/>
            <b-card-text>
                <!-- NOTE: food tags should be added to backend database,
                            instead of being hardcoded here -->
                #burgers #pizza #donught #burek
            </b-card-text>
            <b-button :to="`/restaurants/${restaurant.id}`" variant="primary" float-right class="float-right">
              Order 
              <span style="padding-left: 0.3em;">
                <font-awesome-icon icon="fa-solid fa-arrow-right"/>
              </span>
            </b-button>
        </b-card>
      </div>
    </div>
  </b-container>
</template>
  
<script>
import axios from 'axios';
import { mapState } from "vuex";

export default {
  name:'RestaurantsList',
  computed: {
		...mapState(['cityId']),
	},
  watch: { 
    cityId: function(newId, oldId) {
      this.fetchRestaurantsByCityId(newId);
    }
  },
  data() {
    return {
      restaurants: [],
      // NOTE: in next iteration of code, we should retrieve
      // image names from backend, instead of hardcoding them here
      food_imgs: [
        'food1.jpg',
        'food2.jpg',
        'food3.jpg',
        'food4.jpg',
        'food5.jpeg',
        'food6.jpg',
        'food7.jpg',
        'food8.jpeg',
        'food9.jpeg',
        'food10.jpg',
      ],
    }
  },
  methods: {
    async fetchRestaurantsByCityId(id) {
      // Use Axios to make a call to the API
      const response = await axios.get("https://apifooddelivery.tk/cities/" + id + "/restaurants");
      this.restaurants = response.data;
    }
  },
  mounted: async function() {
    if(this.cityId !== null)
      this.fetchRestaurantsByCityId(this.cityId);
  },
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.cards_container {
  width: 75vw;
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(300px, 1fr));
  column-gap: 30px;
  row-gap: 30px;
}
</style>