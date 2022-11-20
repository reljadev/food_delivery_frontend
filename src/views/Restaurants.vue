<template>
  <div class="home">
    <Title title="Restaurants">
      <CitySearch />
    </Title>
    <RestaurantsList/>
  </div>
</template>

<script>
import Title from '@/components/Title.vue';
import RestaurantsList from '@/components/RestaurantsList.vue';
import CitySearch from '@/components/CitySearch.vue';

export default {
  name: 'Home',
  components: {Title, RestaurantsList, CitySearch},
}
</script>

<style scoped>

</style>
