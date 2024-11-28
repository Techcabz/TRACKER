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
import RecentTables from "@/components/documents/user/tables/RecentTables.vue";
import { onMounted, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useDocuStore } from "@/stores/document";
const authStore = useAuthStore();
const docuStore = useDocuStore();

onMounted(() => {
  authStore.getUser();
  docuStore.fetchDocuments();
});

const isAdmin = computed(() => {
  if (authStore.user) {
    return authStore.user?.role == "1";
  }
});



onMounted(() => {
  docuStore.fetchDocuments(); // Fetch document data on component mount
});

// Computed properties for document counts
const totalPending = computed(() => {
  return docuStore.documents.filter((doc) => doc.status === 1).length;
});

const totalProcess = computed(() => {
  return docuStore.documents.filter((doc) => doc.status === 2).length;
});

const totalApproved = computed(() => {
  return docuStore.documents.filter((doc) => doc.status === 0).length;
});

const totalRejected = computed(() => {
  return docuStore.documents.filter((doc) => doc.status === 3).length;
});

</script>

<template>
  <AdminLayouts>
    <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <!-- Total Pending -->
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Total Pending</CardTitle>
            <FileClock class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-4xl font-bold">{{ totalPending }}</div>
          </CardContent>
        </Card>

        <!-- Total Process -->
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Total In Progress</CardTitle>
            <FileClock class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-4xl font-bold">{{ totalProcess }}</div>
          </CardContent>
        </Card>

        <!-- Total Approved -->
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Total Approved</CardTitle>
            <FileCheck class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-4xl font-bold">{{ totalApproved }}</div>
          </CardContent>
        </Card>

         <!-- Total Approved -->
         <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Total Rejected</CardTitle>
            <FileCheck class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-4xl font-bold">{{ totalRejected }}</div>
          </CardContent>
        </Card>
      </div>

      <div class="grid ">
        <Card class="xl:col-span-2">
          <CardHeader class="flex flex-row items-center">
            <div class="grid gap-2">
              <CardTitle>Document status</CardTitle>
              <CardDescription>Recent uploaded.</CardDescription>
            </div>
            <Button
              as-child
              size="sm"
              class="ml-auto gap-1 bg-grass11 text-white rounded hover:bg-grass11 focus:ring-2 focus:ring-grass11 focus:ring-offset-2 focus:outline-none"
            >
              <router-link :to="{ name: 'document' }">
                View All
                <ArrowUpRight class="h-4 w-4" />
              </router-link>
            </Button>
          </CardHeader>
          <CardContent>
            <RecentTables />
          </CardContent>
        </Card>
      </div>
    </main>
  </AdminLayouts>
</template>
