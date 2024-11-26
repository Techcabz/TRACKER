import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import DashboardView from "@/views/admin/DashboardView.vue";
import DocumentView from "@/views/admin/DocumentView.vue";
import WelcomeView from "@/views/WelcomeView.vue";
import { useAuthStore } from "@/stores/auth";

const isLoggedIn = (): boolean => {
  return localStorage.getItem("token") !== null; // Replace with actual logic
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "welcome",
    component: WelcomeView,
    meta: { guestOnly: true },
  },
  {
    path: "/documents",
    name: "documents",
    component: DocumentView,
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    meta: { requiresAuth: true },
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
  console.log(loggedIn);

  const authStore = useAuthStore();
  authStore.getUser();

  if (to.meta.requiresAuth && !loggedIn) {
    // Redirect guests to login if trying to access protected routes
    return next({ name: "login" });
  }

  if (to.meta.guestOnly && loggedIn) {
    // Redirect logged-in users away from login/register
    return next({ name: "dashboard" });
  }

  next(); // Proceed as normal if no restrictions apply
});

export default router;
