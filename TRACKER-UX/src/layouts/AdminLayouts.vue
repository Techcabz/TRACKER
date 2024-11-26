<script setup lang="jsx">
import SidebarArea from "@/components/layouts/admin/sidebar/SidebarArea.vue";
import NavbarArea from "@/components/layouts/admin/navbar/NavbarArea.vue";
import NavbarSearch from "@/components/layouts/admin/navbar/NavbarSearch.vue";

</script>

<template>
  <div
    class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
  >
    <div class="hidden border-r bg-muted/40 md:block">
      <div class="flex h-full max-h-screen flex-col gap-0">
        <!-- Sidebar -->
        <SidebarArea />
      </div>
    </div>

    <div class="flex flex-col">
      <!-- Navbar -->
      <NavbarArea />
      
      <main class="p-5">
        <slot />
      </main>
    </div>
  </div>
</template>
