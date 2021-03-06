import Vue from 'vue'
import App from './App.vue'
import router from './router'
require('es6-promise').polyfill();
import axios from 'axios'
import VueCookie from 'vue-cookie'
import VuePaginate from 'vue-paginate'

const BANK_SETTINGS = {
  api_url:'http://api.buffalo-bank.com/',
}
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(VueCookie)
Vue.use(VuePaginate)

new Vue({
  el: '#app',
  router,
  created: function() {
    var self = this;

    axios.defaults.baseURL = BANK_SETTINGS.api_url;
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8';
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
    axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS';
    axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type,Access-Control-Allow-Origin,Access-Control-Allow-Headers,Access-Control-Allow-Credentials,Authorization,X-Requested-With,Set-Cookie';

    if (self.$cookie.get('user_key') != null) {
      axios.defaults.headers.common['Authorization'] = "Token " + self.$cookie.get('user_key');
      if(self.$route.name === 'login'){
        self.$router.push({name: 'reports_list'});
      }
    }

    axios.interceptors.response.use(function (response) {
      return response;
    }, function(error) {
      if (error.response && error.response.status === 401) {
        if (self.$route.name !== 'login') {
          notification.notify('error',error.response.data.error);
          router.push({name:'login'});
          return;
        }
      }
      if (error.response && error.response.status == 404) {
        notification.notify('error','Resource not found');
      }
      if (error.response && error.response.status === 422) {
        if(error.response.data.errors){
          error.response.data.errors = error.response.data.errors.map(function(item){
            return item.charAt(0).toUpperCase() + item.slice(1);
          });
          notification.notify('error', error.response.data.errors.join('. '));
        }else{
          notification.notify('error', error.response.error.charAt(0).toUpperCase() + error.response.data.error.slice(1));
        }
      }
      if(!error.response && error.message){
        notification.notify('error',error.message);
      }
      if(error.response){
        return error.response;
      }
    });
  },
  template: '<App/>',
  components: { App }
})
