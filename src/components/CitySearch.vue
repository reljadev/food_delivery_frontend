<template>
    <div class="select-form">
        <b-form-select v-model="selected" 
                    :options="options"
                    @change="onChange">
            <template #first>
                <b-form-select-option :value="{id: null, city: selected.city}" disabled>
                    Please select a city
                </b-form-select-option>
            </template>
        </b-form-select>
        <div class="search-info">
            Showing restaurants in <b>{{ selected.city }}</b>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "CitySearch",
    data() {
        return {
            cities: [],
            selected: {id: null, city: ""},
        }
    },
    computed: {
        options() {
            let res = [];
            
            if(typeof this.cities != 'undefined') {
                // get all cities
                for (let i in this.cities) {
                    res.push({ value: {id: this.cities[i].id, city: this.cities[i].name}, 
                                text: this.cities[i].name});
                }
            }

            return res;
        },
    },
    methods: {
        getDefaultCityId(cities) {
            if(typeof cities != 'undefined') {
                // NOTE: in next iteration of code, we could deduce
                // default city based on user location, or his history
                // Here it's assumed that default city is Novi Sad
                let NoviSadId = null;
                for(let i in cities) {
                    // retrieve id of Novi Sad
                    if(cities[i].name === 'Novi Sad') {
                        NoviSadId = cities[i].id;
                        break;
                    }
                }
                this.$store.commit("updateCity", NoviSadId);
                this.selected.city = "Novi Sad";
            }
        },
        onChange(value) {
            this.$store.commit("updateCity", value.id);
        }
    },
    mounted: async function() {
        const response = await axios.get('https://apifooddelivery.tk/cities');
        this.cities = response.data;
        this.getDefaultCityId(this.cities);
    },
}
</script>

<style scoped>
    .select-form {
        width: 400px;
    }

    .search-info {
        color: white;
    }
</style>