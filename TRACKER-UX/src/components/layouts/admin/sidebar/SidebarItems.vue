<script setup lang="ts">
import { Home, LineChart, ScrollText } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";


</script>

<template>
  <nav class="grid items-start  px-2 text-sm font-medium lg:px-4">
    <router-link
      :to="{ name: 'dashboard' }"
      class="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary"
    >
      <Home class="h-4 w-4" />
      Dashboard
    </router-link>
    <router-link
      :to="{ name: 'documents' }"
      class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
    >
      <ScrollText class="h-4 w-4" />
      Documents
      <!-- <Badge
        class="ml-auto flex h-6 w-6 shrink-0 bg-black text-white items-center justify-center rounded-full"
      >
        0
      </Badge> -->
    </router-link>

  </nav>
</template>
