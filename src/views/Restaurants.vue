<template>
  <div class="home">
    <Title title="Restaurants">
      <CitySearch @cityChoosen="onCityChange" :cities="cities" />
    </Title>
    <RestaurantsList :cityId="cityId" />
  </div>
</template>

<script>
import Title from '@/components/Title.vue';
import RestaurantsList from '@/components/RestaurantsList.vue';
import CitySearch from '@/components/CitySearch.vue';
import axios from 'axios';

export default {
  name: 'Home',
  components: {Title, RestaurantsList, CitySearch},
  data() {
    return {
      cities: [],
      cityId: "c0f50884-8834-4575-8978-cd3fa8af5f9f"
    }
  },
  methods: {
    onCityChange(id) {
      this.cityId = id;
    }
  },
  mounted: async function() {
    const response = await axios.get('http://localhost:8080/cities');
    this.cities = response.data;
  },
}
</script>

<style scoped>

</style>
