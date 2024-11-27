import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import DashboardView from "@/views/admin/DashboardView.vue";
import DocumentView from "@/views/user/DocumentView.vue";
import DocumentMgtView from "@/views/admin/DocumentMgtView.vue";

import { useAuthStore } from "@/stores/auth";
import SettingView from "@/views/admin/SettingView.vue";
import { roleAccess } from "@/config/roleAccess";

const isLoggedIn = (): boolean => {
  return localStorage.getItem("token") !== null; // Replace with actual logic
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "welcome",
    component: LoginView,
    meta: { guestOnly: true },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: "/document",
    name: "document",
    component: DocumentMgtView,
    meta: { requiresAuth: false },
  },
  {
    path: "/documents",
    name: "documents",
    component: DocumentView,
    meta: { requiresAuth: false },
  },
  {
    path: "/users",
    name: "users",
    component: SettingView,
    meta: { requiresAuth: false },
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingView,
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { guestOnly: true },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: { guestOnly: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const loggedIn = isLoggedIn();
  const authStore = useAuthStore();

  // Skip checks for the login route or when explicitly navigating to it
  if (to.name === "login") {
    return next();
  }

  // Ensure user info is fetched if logged in
  if (loggedIn && !authStore.user) {
    await authStore.getUser();
  }

  if (to.meta.requiresAuth && !loggedIn) {
    return next({ name: "login" });
  }

  if (to.meta.guestOnly && loggedIn) {
    return next({ name: "dashboard" });
  }

  const userRole = authStore.userRole;
  const allowedRoutes = roleAccess[userRole] || [];

  if (!allowedRoutes.includes(to.name as string)) {
    return next({ name: "dashboard" });
  }

  next();
});


export default router;
