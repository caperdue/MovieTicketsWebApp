import Vue from "vue";
import VueRouter,{ RouteConfig } from "vue-router";
import BrowseMovies from "./components/BrowseMovies.vue";
import ManageUser from "./components/ManageUser.vue";
import FinalizePurchase from "./components/FinalizePurchase.vue";
import PurchaseConfirmation from "./components/PurchaseConfirmation.vue";
import PrintTicket from "./components/PrintTicket.vue";


Vue.use(VueRouter);
const myRoutes: Array<RouteConfig> = [
  {
    name: "BrowseMovies",
    path: "/",
    component: BrowseMovies,
  },
  {
    name: "Browse Movies",
    path: "/browse",
    component: BrowseMovies,
  },
  {
    name: "Manage User",
    path: "/signin",
    component: ManageUser,
  },
  {
    name: "Finalize Purchase",
    path: "/finalize",
    component: FinalizePurchase,
  },
  {
    name: "Purchase Confirmation",
    path: "/confirmation",
    component: PurchaseConfirmation,
  },
  {
    name: "Print Ticket",
    path: "/print",
    component: PrintTicket,
  },
];

export const AppRouter = new VueRouter({ 
  routes: myRoutes, 
  mode: "history" 
});   
