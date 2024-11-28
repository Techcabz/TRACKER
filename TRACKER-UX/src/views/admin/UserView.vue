<script setup lang="ts">
import Separator from "@/components/ui/separator/Separator.vue";
import AdminLayouts from "@/layouts/AdminLayouts.vue";
import MiniLink from "@/components/general/breadcrumb/MiniLink.vue";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PendingTable from "@/components/users/PendingTable.vue";
import UserTables from "@/components/users/UserTables.vue";
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
              <TabsTrigger value="upload">All User</TabsTrigger>
              <TabsTrigger value="history"> Pending User </TabsTrigger>
            </TabsList>
          </div>
        </div>
        <!-- Content -->
        <TabsContent value="upload">
          <UserTables />
        </TabsContent>
        <TabsContent value="history">
          <PendingTable />
        </TabsContent>
      </Tabs>
    </div>
  </AdminLayouts>
</template>
