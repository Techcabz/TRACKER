<script setup lang="ts">

import DocumentFilter from "@/components/documents/user/filters/DocumentFilter.vue";

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
const isDialogOpen = ref(false);
const isNoTHighUser = computed(() => {
  if (authStore.user) {
    return (
      authStore.user?.personalDetails?.position === "chairman" ||
      authStore.user?.personalDetails?.position === "dean"
    );
  }
});

const closeDialog = () => {
  isDialogOpen.value = false;
};
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
          <DocumentFilter
            @update:isDialogOpen="(value) => (isDialogOpen = value)"
          />
        </div>
        <!-- Content -->
        <TabsContent value="upload">
          <DocuTables
            v-model:isDialogOpen="isDialogOpen"
            :closeDialog="closeDialog"
          />
        </TabsContent>
        <TabsContent value="history">
          <DocuHistory />
        </TabsContent>
      </Tabs>

      <div v-else>
        <HDocuTables />
      </div>
    </div>
  </AdminLayouts>
</template>
