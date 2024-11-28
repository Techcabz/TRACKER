import { roleAccess } from "@/config/roleAccess";
import { defineStore } from "pinia";

// Define the structure of the User and AuthState interfaces
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  personalDetails?: {
    firstname: string;
    lastname: string;
    position: string;
  };
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
    userRole: localStorage.getItem("userRole") || "guest",
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
      this.loading = true;
      try {
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
              role: data.role_as,
              personalDetails:
                data.personal_details.length > 0
                  ? data.personal_details[0]
                  : null,
            };

            this.userRole = data.role_as === 1 ? "admin" : "user";

            // Persist userRole in localStorage
            localStorage.setItem("userRole", this.userRole);
          } else {
            this.user = null;
            this.userRole = "guest";
            localStorage.setItem("userRole", "guest");
          }
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      } finally {
        this.loading = false;
      }
    },

    async authenticate(
      apiRoute: string,
      formData: Record<string, any>
    ): Promise<{ success: boolean; errors?: Record<string, any> }> {
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
        return { success: false, errors: data.errors }; // Return error details
      } else {
        this.errors = {};
        localStorage.setItem("token", data.token);

        this.user = {
          ...data.user,
          role: data.role_as,
          personalDetails:
            data.personal_details.length > 0 ? data.personal_details[0] : null,
        };
        this.userRole = data.role_as === 1 ? "admin" : "user";

        // Persist userRole in localStorage
        localStorage.setItem("userRole", this.userRole);

        // Redirect to dashboard if the authentication is successful
        if (this.router) {
          this.router.push({ name: "dashboard" });
        }

        return { success: true }; // Return success flag
      }
    },
    async login(
      formData: Record<string, any>
    ): Promise<{ success: boolean; errors?: Record<string, any> }> {
      const res = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.errors) {
        this.errors = data.errors;
        return { success: false, errors: data.errors }; // Return error details
      } else {
        this.errors = {};
        localStorage.setItem("token", data.token);

        this.user = {
          ...data.user,
          role: data.role_as,
        };
        this.userRole = data.role_as === 1 ? "admin" : "user";

        // Persist userRole in localStorage
        localStorage.setItem("userRole", this.userRole);

        // Redirect to dashboard after successful login
        if (this.router) {
          this.router.push({ name: "dashboard" });
        }

        return { success: true }; // Return success flag
      }
    },

    async register(
      formData: Record<string, any>
    ): Promise<{ success: boolean; errors?: Record<string, any> }> {
      const res = await fetch(`/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.errors) {
        this.errors = data.errors;
        return { success: false, errors: data.errors }; // Return error details
      } else {
        this.errors = {};
        //localStorage.setItem("token", data.token);

        this.user = {
          ...data.user,
          role: data.role_as,
        };
        this.userRole = data.role_as === 1 ? "admin" : "user";

        // Persist userRole in localStorage
        localStorage.setItem("userRole", this.userRole);

        if (this.router) {
          this.router.push({ name: "dashboard" });
        }

        // Don't redirect here. Instead, rely on the navigation guard
        return { success: true }; // Return success flag
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

        if (res.ok) {
          this.user = null;
          this.errors = {};
          localStorage.removeItem("token");
          localStorage.removeItem("userRole"); // Remove userRole from localStorage on logout
          console.log(data);

          this.router.push({ name: "login" });
        }
      }
    },
  },
});
