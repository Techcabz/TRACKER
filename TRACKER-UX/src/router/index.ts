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

  // Ensure user info is fetched
  await authStore.getUser();

  // If the route requires authentication and the user is not logged in
  if (to.meta.requiresAuth && !loggedIn) {
    return next({ name: "login" });
  }

  // If the route is guest-only but the user is logged in
  if (to.meta.guestOnly && loggedIn) {
    return next({ name: "dashboard" });
  }

  // Get the user's role from the store
  const userRole = authStore.userRole;

  // Check if the route is accessible based on the user's role
  const allowedRoutes = roleAccess[userRole] || [];
  console.log(allowedRoutes);
  // If the route name is not in the allowed routes for the current user role
  if (!allowedRoutes.includes(to.name as string)) {
    return next({ name: "dashboard" }); // Redirect to a default page if not authorized
  }

  next(); // Proceed with navigation if all checks pass
});

export default router;
