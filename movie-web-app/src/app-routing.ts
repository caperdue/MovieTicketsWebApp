import Vue from "vue";
import VueRouter,{ RouteConfig } from "vue-router";
import BrowseMovies from "./components/BrowseMovies.vue";
import ManageUser from "./components/ManageUser.vue";


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
];

export const AppRouter = new VueRouter({ 
  routes: myRoutes, 
  mode: "history" 
});   
