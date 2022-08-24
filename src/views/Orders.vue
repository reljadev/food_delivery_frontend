<template>
    <div class="container">
        <div class="top-space"></div>
        <div v-for="(order, i) in this.orders" :key="i" class="order-item">
            <div class="order-status">
                Status:
                <span style="color: blue">{{ order.status }}</span> 
            </div>
            <div class="order-time">
                Ordered: {{ order.timeOfExecution }}
            </div>
            <div v-for="(restaurant, j) in order.restaurants" :key="j" class="restaurant-item">
                <h4>{{ restaurant.name }}</h4>
                <div v-for="(meal, l) in restaurant.meals" :key="l" class="meal-item">
                    <span class="meal-name">{{ meal.name }}</span>
                    <span class="meal-info">
                        <span class="meal-qty">x {{ meal.quantity }}</span>
                        <span class="meal-price">${{ meal.price }}</span>
                    </span>
                </div>
            </div>
            <div class="bottom-space"></div>
        </div>
    </div>
</template>

<script>
import { getInstance } from "../auth/index.js";
import axios from 'axios';

export default {
    name: "Orders",
    data() {
        return {
            orders: {},
        }
    },
    methods: {
        parseJwt(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        },
        init(fn) {
            // have to do this nonsense to make sure auth0Client is ready
            let instance = getInstance();

            instance.$watch("loading", loading => {
                if (loading === false) {
                    fn(instance);
                }
            });
        },
        async fetchOrders() {
            const token = await this.$auth.getTokenSilently();
            const userId = this.parseJwt(token).sub;
            
            // Use Axios to make a call to the API
            let requestURL = "http://54.90.216.66:8080/users/" + encodeURIComponent(userId) + "/orders";
            let config = {
                      headers: {
                        Authorization: "Bearer " + token
                      }
                    };
            const response = await axios.get(requestURL, config);

            this.orders = response.data;
        }
    },
    mounted() {
        if(this.$auth.loading) {
            this.init(this.fetchOrders);
        } else {
            this.fetchOrders();
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
}

.top-space {
    margin-bottom: 15px;
}

.order-item {
    width: 75%;
    margin-left: 12.5%;
    border: 1px solid black;
    margin-top: 15px;
    margin-bottom: 15px;
}

.order-status {
    font-size: 1.13rem;
    margin-top: 1%;
    margin-left: 1%;
}

.order-time {
    font-size: 1.13rem;
    margin-left: 1%;
    margin-bottom: 2%;
}

.restaurant-item {
    margin-left: 1%;
}

.bottom-space {
    margin-bottom: 2%;
}

.meal-item {
    display: flex;
    justify-content: space-between;
    width: 96%;
    height: 3.5rem;
    margin-left: 1.5%;
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
    background-color: #D8D8D4;
}

.meal-name {
    margin-left: 1rem;
    position: relative;
    top: 15%;
}

.meal-info {
    margin-right: 1rem;
    position: relative;
    top: 15%;
}

.meal-qty {
    margin-right: 1rem;
}

</style>