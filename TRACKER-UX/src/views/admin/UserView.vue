<script setup lang="ts">
import Separator from "@/components/ui/separator/Separator.vue";
import AdminLayouts from "@/layouts/AdminLayouts.vue";

import DocuTables from "@/components/users/admin/UserTables.vue";
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
      <DocuTables />
    </div>
  </AdminLayouts>
</template>
