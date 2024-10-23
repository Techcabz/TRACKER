import { createRouter, createWebHistory } from "vue-router";

import GuestLayout from "@/layouts/GuestLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

import LoginView from "@/views/Auth/LoginView.vue";
import RegisterView from "@/views/Auth/RegisterView.vue";
import HomeView from "@/views/HomeView.vue";

const isAuthenticated = () => {
  return localStorage.getItem("authToken") !== null;
};

const routes = [
  {
    path: "/",
    component: GuestLayout,
    children: [
      {
        path: "",
        name: "login",
        component: LoginView,
      },
      {
        path: "login",
        name: "login",
        component: LoginView,
      },
      {
        path: "register",
        name: "register",
        component: RegisterView,
        meta: {
          title: "| REGISTER",
        },
      },
    ],
  },
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      {
        path: "/admin",
        name: "admin-dashboard",
        component: HomeView,
        meta: {
          title: "| DASHBOARD",
        },
      },
      {
        path: "/documents",
        name: "admin-documents",
        component: HomeView,
        meta: {
          title: "| DOCUMENTS",
        },
      },
      {
        path: "/profile",
        name: "admin-profile",
        component: HomeView,
        meta: {
          title: "| PROFILE",
        },
      },
      {
        path: "/pages/settings",
        name: "admin-settings",
        component: HomeView,
        meta: {
          title: "| SETTINGS",
        },
      },
    ],
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `TRACKING ${to.meta.title || ""}`;

  // Check if the route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next("/"); // Redirect to login if not authenticated
  } else {
    next(); // Proceed to the route
  }
});

export default router;
