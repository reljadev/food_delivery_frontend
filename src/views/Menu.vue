<template>
	<div class="container">
		<div v-if="this.meals_loaded" class="menu">

			<h5 v-if="Object.keys(meals).length === 0">
				There are no meals here yet.
				Check out Waffle Big House restaurant in Novi Sad or,
				88 seconds in Belgrade.
			</h5>

			<div v-for="(mealsOfType, meal_type) in this.mealsByType" :key="meal_type">
				<!-- Heading -->
				<h2 class="menu-group-heading">
					{{ meal_type }}
				</h2>

				<!-- Meals -->
				<div class="menu-group">
					<div v-for="meal in mealsOfType" :key="meal.id" class="menu-item">
						<img class="menu-item-image" :src="meal.coverPhotoPath">
						<div class="menu-item-text">
							<h3 class="menu-item-heading">
								<span class="menu-item-name">{{ meal.name }}</span>
								<span class="menu-item-price">$ {{ meal.price }}</span>
							</h3>
							<p class="menu-item-description">
								{{ meal.description }}
							</p>
							<div class="quantity">
								<a @click="decrement(meal.id)" class="quantity__minus">
									<span>-</span>
								</a>
								<input name="quantity" type="text"
									 class="quantity__input" 
									 :value="cart_meals.hasOwnProperty(meal.id) ? 
									 				cart_meals[meal.id].quantity : 
													0">
								<a @click="increment(meal.id)" class="quantity__plus">
									<span>+</span>
								</a>
							</div>
						</div>
					</div>
				</div>

			</div>

		</div>
	</div>
</template>

<script>
import axios from 'axios';
import store from '../store.js';

export default {
	name: "Menu",
	data() {
		return {
			meals: {},
			mealsByType: {},
			meals_loaded: false,
			cart_meals: store.cart_meals,
		}
	},
	methods: {
		decrement(mealId) {
			if(this.cart_meals.hasOwnProperty(mealId)) {
				if(this.cart_meals[mealId].quantity > 1) {
					this.cart_meals[mealId].quantity--;
				} else {
					this.$delete(this.cart_meals, mealId);
				}
			}
		},
		increment(mealId) {
			if(!this.cart_meals.hasOwnProperty(mealId)) {
				this.$set(this.cart_meals, mealId, 
							{meal: this.meals[mealId], quantity: 0});
			}
			this.cart_meals[mealId].quantity++;
		}
	},
	async mounted() {
		const response = await axios.get("http://apifooddelivery.tk/restaurants/" + this.$route.params.id + "/meals");

		//TODO: Is it a good idea to do this here? Maybe in computed?
		for(let i in response.data) {
			let meal = response.data[i];

			this.meals[meal.id] = meal;

			if(this.mealsByType.hasOwnProperty(meal.type)) {
				this.mealsByType[meal.type].push(meal);
			} else {
				this.mealsByType[meal.type] = [ meal ];
			}
		}

		this.meals_loaded = true;
	}
}
</script>

<style>

.container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 1.5em;
}

.menu {
	font-family: "Inter", sans-serif;
	font-size: 14px;
}

.menu-group-heading {
	margin: 0;
	padding-bottom: 1em;
	border-bottom: 2px solid #ccc;
}

.menu-group {
	display: grid;
	grid-template-columns: 1fr;
	gap: 2.5em 5em;
	padding: 1.5em 0;
}

.menu-item {
	display: flex;
}

.menu-item-image {
	width: 80px;
	height: 80px;
	flex-shrink: 0;
	object-fit: cover;
	margin-right: 1.5em;
}

.menu-item-text {
	flex-grow: 1;
}

.menu-item-heading {
	display: flex;
	justify-content: space-between;
	margin: 0;
}

.menu-item-name {
	margin-right: 1.5em;
}

.menu-item-description {
	line-height: 1.6;
}

@media screen and (min-width: 992px) {
	.menu {
		font-size: 16px;
	}

	.menu-group {
		grid-template-columns: repeat(2, 1fr);
	}

	.menu-item-image {
		width: 125px;
		height: 125px;
	}
}

/* increment & decrement buttons */
.quantity {
  display: flex;
	float: right;
  justify-content: center;
  padding: 0;
}

.quantity__minus,
.quantity__plus {
  display: block;
  width: 22px;
  height: 23px;
  margin: 0;
  background: #dee0ee;
  text-decoration: none !important;
	cursor: pointer;
  text-align: center;
  line-height: 23px;
}

.quantity__minus:hover,
.quantity__plus:hover {
  background: #575b71;
  color: #fff;
}

.quantity__minus {
  border-radius: 3px 0 0 3px;
}

.quantity__plus {
  border-radius: 0 3px 3px 0;
}

.quantity__input {
  width: 32px;
  height: 23px;
  margin: 0;
  padding: 0;
  text-align: center;
  border-top: 2px solid #dee0ee;
  border-bottom: 2px solid #dee0ee;
  border-left: 1px solid #dee0ee;
  border-right: 2px solid #dee0ee;
  background: #fff;
  color: #8184a1;
}

.quantity__minus:link,
.quantity__plus:link {
  color: #8184a1;
}

.quantity__minus:visited,
.quantity__plus:visited {
  color: #fff;
}

</style>