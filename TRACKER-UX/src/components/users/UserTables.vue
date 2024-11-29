<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { valueUpdater } from "@/utils";
import { CaretSortIcon, ChevronDownIcon } from "@radix-icons/vue";
import {
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import { h, ref, onMounted, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { Badge } from "@/components/ui/badge";
import CustomDialog from "@/components/general/dialog/CustomDialog.vue";

import DetailsForm from "./form/DetailsForm.vue";

const isLoading = ref(true);
const userStore = useUserStore();
const users = ref(userStore.users);

// Define the Users interface
export interface Users {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  position: string;
  status: number;
}

const statusMap = {
  0: "Pending",
  1: "Approved",
};

const statusBadgeMap = {
  Pending: "default",
  Approved: "secondary",
};

onMounted(async () => {
  try {
    await userStore.getUserList();
    users.value = userStore.users;
    isLoading.value = false;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    isLoading.value = false;
  }
});

const filteredUsers = computed(() => {
  return users.value.filter((user) => user.role_as === 0 && user.status === 1);
});

// Instead of defining `data` as a static array, we bind it to the computed `filteredUsers`
const selectedUser = computed(() =>
  users.value.find((user) => user.id === selectedUserId.value)
);

const isDialogOpen = ref(false);
const selectedUserId = ref<string>();

// Define the columns for the table
const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Username", h(CaretSortIcon, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) =>
      h("div", { class: "lowercase" }, row.getValue("username")),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Email", h(CaretSortIcon, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => h("div", { class: "lowercase" }, row.getValue("email")),
  },
  {
    accessorKey: "position",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Position", h(CaretSortIcon, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) =>
      h("div", { class: "lowercase" }, row.getValue("position")),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Status", h(CaretSortIcon, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status");
      const statusString = statusMap[status] || "Unknown";
      const badgeVariant = statusBadgeMap[statusString] || "gray";
      return h(
        Badge,
        {
          variant: badgeVariant,
        },
        () => statusString
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const userData = row.original.id;
      return h(
        Button,
        {
          variant: "outline",
          size: "sm",
          class: "bg-grass11 text-white",
          onClick: () => {
            selectedUserId.value = userData;
            isDialogOpen.value = true;
          },
        },
        () => "View"
      );
    },
  },
];

// State for the table
const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const expanded = ref<ExpandedState>({});

// Setup table
const table = useVueTable({
  data: filteredUsers, // Bind directly to the filteredUsers computed property
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnVisibility),
  onExpandedChange: (updaterOrValue) => valueUpdater(updaterOrValue, expanded),
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
    get columnVisibility() {
      return columnVisibility.value;
    },
    get expanded() {
      return expanded.value;
    },
  },
});
</script>

<template>
  <CustomDialog
    v-model:open="isDialogOpen"
    title="User Information"
    description="Below is the information about the user."
    closeText="Cancel"
    saveText="Upload"
  >
    <template #default>
      <div v-if="selectedUser">
        <DetailsForm :selectedUser="selectedUser" />
      </div>
      <div v-else>
        <p>No user selected.</p>
      </div>
    </template>
  </CustomDialog>

  <div v-if="!isLoading" class="w-full">
    <div class="flex items-center py-4">
      <Input
        class="max-w-sm"
        placeholder="Filter users..."
        :model-value="table.getColumn('username')?.getFilterValue() as string"
        @update:model-value="
          table.getColumn('username')?.setFilterValue($event)
        "
      />
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="ml-auto">
            Columns <ChevronDownIcon class="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            v-for="column in table
              .getAllColumns()
              .filter((column) => column.getCanHide())"
            :key="column.id"
            class="capitalize"
            :checked="column.getIsVisible()"
            @update:checked="
              (value) => {
                column.toggleVisibility(!!value);
              }
            "
          >
            {{ column.id }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <template v-for="row in table.getRowModel().rows" :key="row.id">
              <TableRow>
                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </TableCell>
              </TableRow>
              <TableRow v-if="row.getIsExpanded()">
                <TableCell :colspan="row.getAllCells().length">
                  {{ JSON.stringify(row.original) }}
                </TableCell>
              </TableRow>
            </template>
          </template>
          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="flex items-center justify-end space-x-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground">
        {{ table.getFilteredSelectedRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} row(s) selected.
      </div>
      <div class="space-x-2">
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          Next
        </Button>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center items-center h-48">
    <p>Loading...</p>
  </div>
</template>
<style lang="css" scoped>
.lowercase {
  margin-left: 10px;
}
</style>
