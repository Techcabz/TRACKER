<script setup lang="ts">
import { Home, ScrollText, Users } from "lucide-vue-next";
import { computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRoute } from "vue-router";
const authStore = useAuthStore();
const route = useRoute();

// Role-based visibility for documents link
onMounted(() => {
  authStore.getUser();
});

const showDocumentsLink = computed(() => {
  if (authStore.user) {
    return authStore.user?.role != "1";
  }
});

const isAdmin = computed(() => {
  if (authStore.user) {
    return authStore.user?.role == "1";
  }
});

const isActive = (routeName: string) => route.name === routeName;
</script>

<template>
  <nav class="grid items-start mt-2 px-2 text-sm font-medium lg:px-4">
    <!-- Dashboard Link -->

    <router-link
      :to="{ name: 'dashboard' }"
      class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
      :class="{
        'bg-muted text-primary': isActive('dashboard'),
        'text-muted-foreground hover:text-primary': !isActive('dashboard'),
      }"
    >
      <Home class="h-4 w-4" />
      Dashboard
    </router-link>

    <!-- Documents Link: Show only if allowed by the role -->
    <router-link
      v-if="showDocumentsLink"
      :to="{ name: 'documents' }"
      class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
      :class="{
        'bg-muted text-primary': isActive('documents'),
        'text-muted-foreground hover:text-primary': !isActive('documents'),
      }"
    >
      <ScrollText class="h-4 w-4" />
      Documents
    </router-link>

    <router-link
      v-else
      :to="{ name: 'document' }"
      class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
      :class="{
        'bg-muted text-primary': $route.name === 'document',
        'text-muted-foreground hover:text-primary': $route.name !== 'document',
      }"
    >
      <ScrollText class="h-4 w-4" />
      Document Mgt.
    </router-link>

    <router-link
      v-if="isAdmin"
      :to="{ name: 'users' }"
      class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
      :class="{
        'bg-muted text-primary': isActive('users'),
        'text-muted-foreground hover:text-primary': !isActive('users'),
      }"
    >
      <Users  class="h-4 w-4" />
      Users Mgt.
    </router-link>
  </nav>
</template>
