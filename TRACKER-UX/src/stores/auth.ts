import { defineStore } from "pinia";

// Define the structure of the User and AuthState interfaces
interface User {
  id: number;
  name: string;
  email: string;
  [key: string]: any;
}

interface AuthState {
  user: User | null;
  errors: Record<string, string[]>;
}

export const useAuthStore = defineStore("authStore", {
  state: (): AuthState => ({
    user: null,
    errors: {},
  }),

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
          this.user = data;
        }
        console.log(data);

        
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
        this.user = data.user;

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
          this.router.push({ name: "login" });
        }
      }
    },
  },
});
