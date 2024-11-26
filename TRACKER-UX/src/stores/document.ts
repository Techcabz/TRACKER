import { defineStore } from "pinia";
import axios from "axios";

export const useDocuStore = defineStore("docuStore", {
  state: () => ({
    documents: [] as Array<{
      id: number;
      name: string;
      category: string;
      file: null;
    }>,
    isLoading: false,
    errors: null as string | null,
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

    // Upload a document to the server
    async uploadDocument(payload: FormData) {
      const token = localStorage.getItem("token");
      this.isLoading = true;
      this.errors = null;

      axios.post("/api/upload", payload).then((res) => {
        console.log("uploaded: ", res.data);
      });

      // const formDataToObject = (formData: FormData) => {
      //   const obj: Record<string, any> = {};
      //   formData.forEach((value, key) => {
      //     obj[key] = value;
      //   });
      //   return obj;
      // };

      // // Inside your `uploadDocument` function
      // const formDataObject = formDataToObject(payload);
      // console.log(formDataObject);

      // try {
      //   const response = await fetch("/api/upload", {
      //     method: "POST",
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       // No need to set 'Content-Type' header, because FormData will handle it
      //     },
      //     body: payload, // Send the FormData directly
      //   });

      //   if (!response.ok) {
      //     const errorData = await response.json();
      //     throw new Error(errorData.message || "Failed to upload document.");
      //   }

      //   const data = await response.json();
      //   // Add the uploaded document to the local store
      //   this.documents.push(data);
      //   return data;
      // } catch (error: any) {
      //   this.errors = error.message || "Failed to upload document.";
      //   throw error;
      // } finally {
      //   this.isLoading = false;
      // }
    },

    // Example: Remove a document from the local state (useful for delete actions)
    removeDocument(documentId: number) {
      this.documents = this.documents.filter((doc) => doc.id !== documentId);
    },

    // Example: Update a document's details in local state (useful for editing)
    updateDocument(updatedDoc: { id: number; name: string; category: string }) {
      const index = this.documents.findIndex((doc) => doc.id === updatedDoc.id);
      if (index !== -1) {
        this.documents[index] = updatedDoc;
      }
    },
  },
});
