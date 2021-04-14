import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { AppRouter } from "./app-routing"
import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);


Vue.config.productionTip = false

//Firebase config files
const firebaseConfig = {
  apiKey: "AIzaSyAjJOdSf8vxfXHkGKTHJtb_CKAF3F1Mwpw",
  authDomain: "movie-web-app-3778a.firebaseapp.com",
  projectId: "movie-web-app-3778a",
  storageBucket: "movie-web-app-3778a.appspot.com",
  messagingSenderId: "299152408377",
  appId: "1:299152408377:web:1685deb55ceeb77c2ff2e8"
};
firebase.initializeApp(firebaseConfig);
// Initialize Firebase
Vue.prototype.$appDB = firebase.firestore();
Vue.prototype.$appAuth = firebase.auth();




new Vue({ 
  router: AppRouter, 
  render: (h) => h(App)
}).$mount('#app')