import axios from "axios";
import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/auth"; // Import auth store

export const useDocuStore = defineStore("docuStore", {
  state: () => ({
    isLoading: false,
    errors: null as string | null,
    documents: [] as any[],
    document: [] as any[],
  }),

  actions: {
    // Fetch documents from the server
    async fetchDocuments() {
      const token = localStorage.getItem("token");
      this.isLoading = true;
      this.errors = null;

      try {
        const response = await fetch("/api/documents", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch documents.");
        }

        const data = await response.json();
        //   console.log(data)
        this.documents = data; // Store the fetched documents in the state
      } catch (error: any) {
        this.errors = error.message || "Failed to fetch documents.";
      } finally {
        this.isLoading = false;
      }
    },

    async getDocuments() {
      const authStore = useAuthStore();
      const token = localStorage.getItem("token");
      this.isLoading = true;
      this.errors = null;

      if (!token) {
        this.errors = "No token found.";
        return;
      }

      let id = 1;
      try {
        const userId = authStore.user?.id;

        if (!userId) {
          this.errors = "User ID not found.";
          return;
        }
        const response = await fetch(`/api/documents/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch documents.");
        }

        const data = await response.json();
        console.log(data);
        this.document = data;
      } catch (error: any) {
        this.errors = error.message || "Failed to fetch documents.";
      } finally {
        this.isLoading = false;
      }
    },

    // Upload a document to the server
    async uploadDocument(formData) {
      const token = localStorage.getItem("token");
      this.isLoading = true;
      this.errors = null;

      try {
        const response = await fetch("/api/documents", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to upload document.");
        }

        const data = await response.json();
        this.documents.push(data); // Add the uploaded document to the state
        return data;
      } catch (error: any) {
        this.errors = error.message || "Failed to upload document.";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    removeDocument(documentId: number) {
      this.documents = this.documents.filter((doc) => doc.id !== documentId);
    },

    updateDocument(updatedDoc: { id: number; name: string; category: string }) {
      const index = this.documents.findIndex((doc) => doc.id === updatedDoc.id);
      if (index !== -1) {
        this.documents[index] = updatedDoc;
      }
    },
  },
});
