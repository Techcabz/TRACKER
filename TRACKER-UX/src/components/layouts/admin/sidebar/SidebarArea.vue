<script setup lang="ts">
import {  Package2 } from "lucide-vue-next";

import SidebarItems from "./SidebarItems.vue";
</script>

<template>
  <div class="flex h-15 items-center  border-b  px-4 lg:h-[60px] lg:px-6">
    <a href="/" class="flex items-center gap-2 font-semibold">
      <Package2 class="h-6 w-6" />
      <span class="">DOCUMENT-TRACKER</span>
    </a>
    <!-- <Button variant="outline" size="icon" class="ml-auto h-8 w-8 rounded">
      <Bell class="h-4 w-4" />
      <span class="sr-only">Toggle notifications</span>
    </Button> -->
  </div>
  <div class="flex-1  text-black">
    <!-- Links -->
     <SidebarItems />
  </div>
</template>
