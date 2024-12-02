import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/auth";

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

        this.documents = data;
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

        this.document = data;
      } catch (error: any) {
        this.errors = error.message || "Failed to fetch documents.";
      } finally {
        this.isLoading = false;
      }
    },
    async changeStatus(
      docuId: number,
      status: number
    ): Promise<{ success: boolean; data?: any; errors?: any }> {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return { success: false, errors: "No token found" };
      }

      try {
        const res = await fetch(`/api/documents/${docuId}/approve`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          return { success: true, data };
        } else {
          const data = await res.json();
          return { success: false, errors: data.errors };
        }
      } catch (error) {
        console.error("Error while updating document status", error);
        return { success: false, errors: error.message };
      }
    },

    // Upload a document to the server
    async uploadDocument(formData: FormData) {
      const token = localStorage.getItem("token");
      this.isLoading = true;
      this.errors = null;

      try {
        const response = await fetch("/api/documents", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Bearer token for authentication
          },
          body: formData, // FormData as the request body
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to upload document.");
        }

        const data = await response.json();
        this.documents.push(data); // Update the documents array in the store
        return data;
      } catch (error) {
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
