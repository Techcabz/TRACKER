import { defineStore } from "pinia";

export const useDocuStore = defineStore("docuStore", {
  state: () => ({
    documents: [] as Array<{
      id: number;
      name: string;
      category: string;
      file_path: string;
    }>,
    isLoading: false,
    errors: null as string | null,
  }),
  actions: {
    async fetchDocuments() {
      const token = localStorage.getItem("token");
      this.isLoading = true;
      this.errors = null;
      try {
        const response = await fetch("/api/documents", {
          headers: {
            authorization: `Bearer ${token}`,
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
    async uploadDocument(payload: FormData) {
      const token = localStorage.getItem("token");
      this.isLoading = true;
      this.errors = null;
      try {
        const response = await fetch("/api/documents", {
          method: "POST",
          body: payload,
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to upload document.");
        }

        const data = await response.json();
        this.documents.push(data);
        return data;
      } catch (error: any) {
        this.errors = error.message || "Failed to upload document.";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
