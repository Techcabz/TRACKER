import { defineStore } from "pinia";

// Define the structure of the User interface
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

export const useUserStore = defineStore("userStore", {
  state: () => ({
    errors: {} as Record<string, string[]>, // Track errors
  }),

  actions: {
    // Fetch user list
    async getUserList(): Promise<User[] | null> {
      const token = localStorage.getItem("token");
      this.loading = true;
      try {
        if (token) {
          const res = await fetch("/api/users", {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const data = await res.json();

            return data; // Return the list of users
          } else {
            console.error("Failed to fetch user data");
            return null;
          }
        } else {
          console.error("No token found");
          return null;
        }
      } catch (error) {
        console.error("Error while fetching users", error);
        return null;
      } finally {
        this.loading = false;
      }
    },

    // Store a new user
    async storeUser(userData: User): Promise<boolean> {
      const token = localStorage.getItem("token");
      try {
        if (token) {
          const res = await fetch("/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userData), // Send user data in the request body
          });

          if (res.ok) {
            const data = await res.json();
            console.log("User created:", data);
            return true; // Successfully created
          } else {
            const data = await res.json();
            this.errors = data.errors || {};
            console.error("Failed to create user:", data.errors);
            return false; // Failed to create
          }
        } else {
          console.error("No token found");
          return false;
        }
      } catch (error) {
        console.error("Error while storing user", error);
        return false;
      }
    },

    // Update an existing user
    async updateUser(userId: number, updatedData: User): Promise<boolean> {
      const token = localStorage.getItem("token");
      try {
        if (token) {
          const res = await fetch(`/api/users/${userId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedData), // Send updated user data
          });

          if (res.ok) {
            const data = await res.json();
            console.log("User updated:", data);
            return true; // Successfully updated
          } else {
            const data = await res.json();
            this.errors = data.errors || {};
            console.error("Failed to update user:", data.errors);
            return false; // Failed to update
          }
        } else {
          console.error("No token found");
          return false;
        }
      } catch (error) {
        console.error("Error while updating user", error);
        return false;
      }
    },

    // Delete a user
    async deleteUser(userId: number): Promise<boolean> {
      const token = localStorage.getItem("token");
      try {
        if (token) {
          const res = await fetch(`/api/users/${userId}`, {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            console.log(`User with id ${userId} deleted`);
            return true; // Successfully deleted
          } else {
            const data = await res.json();
            this.errors = data.errors || {};
            console.error("Failed to delete user:", data.errors);
            return false; // Failed to delete
          }
        } else {
          console.error("No token found");
          return false;
        }
      } catch (error) {
        console.error("Error while deleting user", error);
        return false;
      }
    },
  },
});
