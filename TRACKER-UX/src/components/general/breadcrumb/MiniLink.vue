<script setup lang="ts">
import { useRoute } from "vue-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { computed } from "vue";

const route = useRoute();

const maxBreadcrumbs = 3; 

const breadcrumbs = computed(() => {
  const matchedRoutes = route.matched.map((matchedRoute) => {
    const breadcrumb = matchedRoute.meta.breadcrumb;
    return {
      label: typeof breadcrumb === "function" ? breadcrumb(route) : breadcrumb,
      path: matchedRoute.path !== "/" ? matchedRoute.path : null, 
    };
  });

  const dashboardBreadcrumb = { label: "Dashboard", path: "/dashboard" };

 
  if (matchedRoutes.length > maxBreadcrumbs - 1) {
    return [
      dashboardBreadcrumb,
      { label: "...", path: null },
      ...matchedRoutes.slice(-1), 
    ];
  }

  return [dashboardBreadcrumb, ...matchedRoutes];
});
</script>

<template>
  <div class="flex-0 py-3">
    <Breadcrumb class="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem v-for="(breadcrumb, index) in breadcrumbs" :key="index">
          <template v-if="breadcrumb.path">
            <!-- Render a link for navigable breadcrumbs -->
            <BreadcrumbLink v-if="index !== breadcrumbs.length - 1">
              <router-link :to="breadcrumb.path">{{
                breadcrumb.label
              }}</router-link>
            </BreadcrumbLink>
            <BreadcrumbPage v-else>{{ breadcrumb.label }}</BreadcrumbPage>
          </template>
          <template v-else>
            <!-- Render ellipsis for truncated breadcrumbs -->
            <BreadcrumbPage>...</BreadcrumbPage>
          </template>
          <BreadcrumbSeparator v-if="index !== breadcrumbs.length - 1" />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
</template>
