import Vue from 'vue';
import router from './router';
import App from './App.vue';
// bootstrap-vue
import './plugins/bootstrap-vue';
// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHouse, faArrowRight, faCartShopping } from '@fortawesome/free-solid-svg-icons';
// auth0
import { domain, clientId, audience } from '../auth_config.json';
import { Auth0Plugin } from './auth';
// store
import store from "./store";

// fontawesome icons
library.add(faHouse, faArrowRight, faCartShopping);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

// Auth0 plugin
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

new Vue({
  router,
  store,
  render: function (h) { return h(App) },
}).$mount('#app');
