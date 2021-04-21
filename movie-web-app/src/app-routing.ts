import Vue from "vue";
import VueRouter,{ RouteConfig } from "vue-router";
import BrowseMovies from "./components/BrowseMovies.vue";
import ManageUser from "./components/ManageUser.vue";
import FinalizePurchase from "./components/FinalizePurchase.vue";
import PurchaseConfirmation from "./components/PurchaseConfirmation.vue";
import PrintTicket from "./components/PrintTicket.vue";
import ViewTickets from "./components/ViewTickets.vue";
import firebase from 'firebase/app';
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";

Vue.use(VueRouter);
const myRoutes: Array<RouteConfig> = [
  {
    name: "Manage User",
    path: "/",
    component: ManageUser,
  },
  {
    name: "Browse Movies",
    path: "/browse",
    component: BrowseMovies,
    meta : {
      requireAuth: true,
    }
  },

  {
    name: "Finalize Purchase",
    path: "/finalize",
    component: FinalizePurchase,
    meta : {
      requireAuth: true,
    }
  },

  {
    name: "Purchase Confirmation",
    path: "/confirmation",
    component: PurchaseConfirmation,
    meta : {
      requireAuth: true,
    }
  },

  {
    name: "Print Ticket",
    path: "/print",
    component: PrintTicket,
    meta : {
      requireAuth: true,
    }
  },

  {
    name: "View Tickets",
    path: "/tickets",
    component: ViewTickets,
    meta : {
      requireAuth: true,
    }
  },
  
];

export const AppRouter = new VueRouter({ 
  routes: myRoutes, 
  mode: "history" 
});   

//Make sure the user is successfully logged in before going to paths that require signed in user
AppRouter.beforeEach(async (to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;
  if (currentUser === null && (to.path === "/finalize" || to.path === "/confirmation" || to.path === "/print") ) {
    next({path: "/"});
  }
  else {
    next();
  }

});
