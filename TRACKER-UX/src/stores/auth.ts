import { roleAccess } from "@/config/roleAccess";
import { defineStore } from "pinia";

// Define the structure of the User and AuthState interfaces
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  [key: string]: any;
}

interface AuthState {
  user: User | null;
  errors: Record<string, string[]>;
  userRole: string;
}

export const useAuthStore = defineStore("authStore", {
  state: (): AuthState => ({
    user: null,
    errors: {},
    userRole: localStorage.getItem("userRole") || "guest", // Initialize userRole from localStorage
  }),
  getters: {
    isAuthenticated(): boolean {
      return this.user !== null;
    },
    userRoleGetter(): string {
      // Getter for userRole
      return this.user?.role || this.userRole;
    },
    accessibleRoutes(): string[] {
      return roleAccess[this.userRole] || [];
    },
  },
  actions: {
    async getUser(): Promise<void> {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await fetch("/api/user", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          this.user = {
            ...data,
            role: data.role_as, // Ensure the API response includes the role
          };

          this.userRole = data.role_as === 1 ? "admin" : "user"; // Set the userRole in the state

         
          // Persist userRole in localStorage
          localStorage.setItem("userRole", this.userRole);
        } else {
          this.user = null;
          this.userRole = "guest"; // Default to guest if no valid user found
          localStorage.setItem("userRole", "guest"); // Persist "guest" in localStorage
        }
      }
    },

    async authenticate(
      apiRoute: string,
      formData: Record<string, any>
    ): Promise<void> {
      const res = await fetch(`/api/${apiRoute}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.errors = {};
        localStorage.setItem("token", data.token);

        this.user = {
          ...data.user,
          role: data.role_as, // Assuming this comes from your backend as role_as
        };
        this.userRole = data.role_as === 1 ? "admin" : "user"; // Set the userRole based on API response
        console.log(this.userRole);
        // Persist userRole in localStorage
        localStorage.setItem("userRole", this.userRole);

        // Make sure to access the router with `this.$router`
        if (this.router) {
          this.router.push({ name: "dashboard" });
        }
      }
    },

    async logout(): Promise<void> {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await fetch("/api/logout", {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log(data);

        if (res.ok) {
          this.user = null;
          this.errors = {};
          localStorage.removeItem("token");
          localStorage.removeItem("userRole"); // Remove userRole from localStorage on logout
          this.router.push({ name: "login" });
        }
      }
    },
  },
});
