<script setup lang="ts">
import { Home, ScrollText } from "lucide-vue-next";
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRoute } from "vue-router";
const authStore = useAuthStore();
const route = useRoute


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
  <nav class="grid gap-2 text-lg font-medium ">
    <router-link :to="{ name: 'dashboard' }" class="flex items-center gap-2 text-lg font-semibold">
      <Package2 class="h-6 w-6" />
      <span class="sr-only text-black">DOCUMENT-TRACKER</span>
    </router-link>
    <router-link :to="{ name: 'dashboard' }" class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all" :class="{
      'bg-muted text-primary': isActive('dashboard'),
      'text-muted-foreground hover:text-primary': !isActive('dashboard'),
    }">
      <Home class="h-4 w-4" />
      Dashboard
    </router-link>
    <router-link v-if="showDocumentsLink" :to="{ name: 'documents' }"
      class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all" :class="{
        'bg-muted text-primary': isActive('documents'),
        'text-muted-foreground hover:text-primary': !isActive('documents'),
      }">
      <ScrollText class="h-4 w-4" />
      Documents
    </router-link>
    <router-link v-else :to="{ name: 'document' }" class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
      :class="{
        'bg-muted text-primary': $route.name === 'document',
        'text-muted-foreground hover:text-primary': $route.name !== 'document',
      }">
      <ScrollText class="h-4 w-4" />
      Document Mgt.
    </router-link>

    <router-link v-if="isAdmin" :to="{ name: 'users' }"
      class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all" :class="{
        'bg-muted text-primary': isActive('users'),
        'text-muted-foreground hover:text-primary': !isActive('users'),
      }">
      <Users class="h-4 w-4" />
      Users Mgt.
    </router-link>
  </nav>
</template>
