import Vue from 'vue';
import VueNotifications from 'vue-notifications';
import miniToastr from 'mini-toastr';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import { createProvider } from './vue-apollo';
import '@/assets/css/tailwind.css';

Vue.config.productionTip = false;

miniToastr.init();

function toast({ title, message, type, timeout, cb }) {
  return miniToastr[type](message, title, timeout, cb);
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast,
};
Vue.use(VueNotifications, options);

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App),
}).$mount('#app');
