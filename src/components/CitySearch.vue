<template>
    <div class="select-form">
        <b-form-select v-model="selected" 
                    :options="options"
                    @change="onChange">
            <template #first>
                <b-form-select-option :value="{id: null, city: 'Novi Sad'}" disabled>
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
    export default {
        name: "CitySearch",
        props: ["cities"],
        data() {
            return {
                selected: {id: null, city: 'Novi Sad'},
            }
        },
        methods: {
            getDefaultCityId() {
                if(typeof this.cities != 'undefined') {
                    // default city is Novi Sad
                    let NoviSadId = null;
                    for(let i in this.cities) {
                        // retrieve id of Novi Sad
                        if(this.cities[i].name === 'Novi Sad') {
                            NoviSadId = this.cities[i].id;
                        }
                    }
                }
            },
            onChange(value) {
                this.$emit('cityChoosen', value.id);
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
        }
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