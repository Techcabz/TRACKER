<script setup lang="ts">
import { Home, ScrollText } from "lucide-vue-next";
import { Badge } from "@/components/ui/badge";
</script>

<template>
  <nav class="grid gap-2 text-lg font-medium">
    <router-link
      :to="{ name: 'dashboard' }"
      class="flex items-center gap-2 text-lg font-semibold"
    >
      <Package2 class="h-6 w-6" />
      <span class="sr-only text-white">DOCUMENT-TRACKER</span>
    </router-link>
    <router-link
      :to="{ name: 'dashboard' }"
      class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
    >
      <Home class="h-5 w-5" />
      Dashboard
    </router-link>
    <router-link
      :to="{ name: 'documents' }"
      class="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
    >
      <ScrollText class="h-4 w-4" />
      Documents
      <!-- <Badge
        class="ml-auto flex h-6 w-6 shrink-0 bg-white text-black items-center justify-center rounded-full"
      >
        0
      </Badge> -->
    </router-link>
  </nav>
</template>
