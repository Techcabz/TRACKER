<script setup lang="ts">
import Separator from "@/components/ui/separator/Separator.vue";
import AdminLayouts from "@/layouts/AdminLayouts.vue";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import DocuHistory from "@/components/documents/admin/tables/DocuHistory.vue";
import DocuTables from "@/components/documents/admin/tables/DocuTables.vue";
import MiniLink from "@/components/general/breadcrumb/MiniLink.vue";
</script>

<template>
  <AdminLayouts>
    <div class="flex flex-1 flex-col gap-2 p-2 lg:p-2">
      <div class="flex items-center justify-between">
        <!-- BreadCrumb -->
        <MiniLink />
        <!-- SearchBar -->
      </div>
      <Separator orientation="horizontal" />
      <Tabs default-value="upload">
        <!-- Filters and Navigation -->
        <div class="flex">
          <div class="md:flex items-center">
            <TabsList>
              <TabsTrigger value="upload">Approved Document </TabsTrigger>
              <TabsTrigger value="history">Under Review</TabsTrigger>
            </TabsList>
          </div>
        </div>
        <!-- Content -->
        <TabsContent value="upload">
          <DocuTables />
        </TabsContent>
        <TabsContent value="history">
          <DocuHistory />
        </TabsContent>
      </Tabs>
    </div>
  </AdminLayouts>
</template>
