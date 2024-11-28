<script setup lang="jsx">
import AdminLayouts from "@/layouts/AdminLayouts.vue";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  FileCheck,
  Menu,
  Package2,
  Search,
  FileClock,
} from "lucide-vue-next";
import DocuHistory from "@/components/documents/user/tables/DocuHistory.vue";
import DocuTables from "@/components/documents/user/tables/DocuTables.vue";
import { onMounted, computed } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

onMounted(() => {
  authStore.getUser();
});

const isAdmin = computed(() => {
  if (authStore.user) {
    return authStore.user?.role == "1";
  }
});

</script>

<template>
  <AdminLayouts>
    <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <CardTitle class="text-sm font-medium"> Total Pending </CardTitle>
            <FileClock class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-4xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <CardTitle class="text-sm font-medium"> Total Approved </CardTitle>
            <FileCheck class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-4xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>
      <div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card class="xl:col-span-2">
          <CardHeader class="flex flex-row items-center">
            <div class="grid gap-2">
              <CardTitle>Document status</CardTitle>
              <CardDescription> Recent uploaded. </CardDescription>
            </div>
            <Button
              as-child
              size="sm"
              class="ml-auto gap-1 bg-grass11 gap-1 text-white rounded hover:bg-grass11 focus:ring-2 focus:ring-grass11 focus:ring-offset-2 focus:outline-none"
            >
              <router-link v-if="isAdmin" :to="{ name: 'document' }">
                View All
                <ArrowUpRight class="h-4 w-4" />
              </router-link>
              <router-link v-else :to="{ name: 'documents' }">
                View All
                <ArrowUpRight class="h-4 w-4" />
              </router-link>
            </Button>
          </CardHeader>
          <CardContent>
            <DocuTables />
          </CardContent>
        </Card>
      </div>
    </main>
  </AdminLayouts>
</template>
