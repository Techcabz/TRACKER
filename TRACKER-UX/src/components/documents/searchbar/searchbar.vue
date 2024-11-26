<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Search } from "lucide-vue-next";
</script>

<template>
  <div class="relative ml-auto flex-1 md:grow-0 ">
    <Search class="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
    <Input
      type="search"
      placeholder="Search..."
      class="w-full rounded bg-background pl-8 md:w-[200px] lg:w-[320px]"
    />
  </div>
</template>
