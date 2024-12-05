import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import DashboardView from "@/views/admin/DashboardView.vue";
import DocumentView from "@/views/user/DocumentView.vue";
import DocumentMgtView from "@/views/admin/DocumentMgtView.vue";

import { useAuthStore } from "@/stores/auth";
import SettingView from "@/views/admin/SettingView.vue";
import { roleAccess } from "@/config/roleAccess";
import UserView from "@/views/admin/UserView.vue";

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
    meta: { requiresAuth: true, breadcrumb: "Dashboard" },
  },
  {
    path: "/document",
    name: "document",
    component: DocumentMgtView,
    meta: { requiresAuth: true, breadcrumb: "Document" },
  },
  {
    path: "/documents",
    name: "documents",
    component: DocumentView,
    meta: { requiresAuth: true, breadcrumb: "Documents" },
  },
  {
    path: "/users",
    name: "users",
    component: UserView,
    meta: { requiresAuth: true, breadcrumb: "Users" },
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingView,
    meta: { requiresAuth: true, breadcrumb: "Settings" },
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

router.beforeEach(async (to, _, next) => {
  const loggedIn = isLoggedIn();
  const authStore = useAuthStore();

  
  if (to.name === "login" || to.name === "register") {
    // If logged in, redirect to dashboard instead of allowing login/register
    if (loggedIn) {
      return next({ name: "dashboard" });
    }
    return next(); 
  }

  // Ensure user info is fetched if logged in
  if (loggedIn && !authStore.user) {
    await authStore.getUser();
  }

  // Redirect to login page if the route requires auth and the user is not logged in
  if (to.meta.requiresAuth && !loggedIn) {
    return next({ name: "login" });
  }

  // If the user is logged in but tries to visit a guest-only route, redirect to the dashboard
  if (to.meta.guestOnly && loggedIn) {
    return next({ name: "dashboard" });
  }

  // Check user role and if they have access to the route
  const userRole = authStore.userRole;
  const allowedRoutes = roleAccess[userRole] || [];

  // If the route is not allowed for the user's role, redirect to the dashboard
  if (!allowedRoutes.includes(to.name as string)) {
    return next({ name: "dashboard" });
  }

  next();
});



export default router;
