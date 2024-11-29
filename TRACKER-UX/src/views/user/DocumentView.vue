<script setup lang="ts">
import DocuDialog from "@/components/documents/user/dialog/DocuDialog.vue";
import DocumentFilter from "@/components/documents/user/filters/DocumentFilter.vue";
import DocuUpload from "@/components/documents/user/form/DocuUpload.vue";

import Button from "@/components/ui/button/Button.vue";
import Separator from "@/components/ui/separator/Separator.vue";
import AdminLayouts from "@/layouts/AdminLayouts.vue";
import { useDocuStore } from "@/stores/document";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const docuStore = useDocuStore();
import DocuHistory from "@/components/documents/user/tables/DocuHistory.vue";
import MiniLink from "@/components/general/breadcrumb/MiniLink.vue";
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref, computed } from "vue";
import DocuTables from "@/components/documents/user/tables/DocuTables.vue";
import HDocuTables from "@/components/documents/huser/DocuTables.vue";
const document = ref(docuStore.document);
const authStore = useAuthStore();

onMounted(async () => {
  // await docuStore.fetchDocuments();
  await docuStore.getDocuments();
  authStore.getUser();
  document.value = docuStore.document;
});

const isNoTHighUser = computed(() => {
  if (authStore.user) {
    return (
      authStore.user?.personalDetails?.position === "chairman" ||
      authStore.user?.personalDetails?.position === "dean"
    );
  }
});
</script>

<template>
  <AdminLayouts>
    <div class="flex flex-1 flex-col gap-2 p-2 lg:p-2">
      <div class="flex items-center justify-between">
        <!-- BreadCrumb -->
        <MiniLink />
        <!-- SearchBar -->
        <!-- <Searchbar /> -->
      </div>
      <Separator orientation="horizontal" />
      <Tabs default-value="upload" v-if="!isNoTHighUser">
        <!-- Filters and Navigation -->
        <div class="flex">
          <div class="md:flex items-center">
            <TabsList>
              <TabsTrigger value="upload"> Document Uploaded </TabsTrigger>
              <TabsTrigger value="history"> Document History </TabsTrigger>
            </TabsList>
          </div>
          <DocumentFilter />
        </div>
        <!-- Content -->
        <TabsContent value="upload">
          <div class="flex mt-5 flex-1 flex-col gap-5">
            <div class="flex flex-0 items-center">
              <h1 class="text-lg font-semibold md:text-2xl">Documents</h1>
            </div>
            <div
              v-if="docuStore.document.length === 0"
              class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm py-5"
            >
              <div class="flex flex-col items-center gap-3 text-center">
                <h3 class="text-2xl font-bold tracking-tight">
                  You have no documents
                </h3>
                <p class="text-sm text-muted-foreground">
                  You can get started as soon as you upload a document.
                </p>

                <DocuDialog
                  title="Upload Documents"
                  description="Please upload your document files below."
                  closeText="Cancel"
                  saveText="Upload"
                >
                  <template #trigger>
                    <Button
                      class="mt-4 bg-grass11 text-white rounded hover:bg-grass11 focus:ring-2 focus:ring-grass11 focus:ring-offset-2 focus:outline-none"
                    >
                      Upload Documents
                    </Button>
                  </template>

                  <template #default>
                    <DocuUpload />
                  </template>
                </DocuDialog>
              </div>
            </div>

            <div v-else>
              <DocuTables />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="history">
          <DocuHistory />
        </TabsContent>
      </Tabs>

      <div v-else>
       <HDocuTables/>
      </div>
    </div>
  </AdminLayouts>
</template>
