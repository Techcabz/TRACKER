<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import CustomDialog from "@/components/general/dialog/CustomDialog.vue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDocuStore } from "@/stores/document";
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
import StatusPage from "../../user/status/StatusPage.vue";

const docuStore = useDocuStore();
const documents = ref(docuStore.documents);
const isLoading = ref(true);

onMounted(async () => {
  try {
    await docuStore.fetchDocuments();
    documents.value = docuStore.documents;
    isLoading.value = false;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    isLoading.value = false;
  }
});

export interface Documents {
  id: string;
  name: string;
  status: number;
  category: string;
}

const statusMap = {
  0: "Pending",
  1: "InProgress",
  2: "Verify",
  3: "Success",
  4: "Failed",
};

const statusBadgeMap = {
  Pending: "default",
  InProgress: "secondary",
  Verify: "outline",
  Success: "outline",
  Failed: "destructive",
};

const filteredDocuments = computed(() => {
  return documents.value.filter(
    (documents) =>
      documents.status === 3 
  );
});

const selectedDocument = computed(() =>
  documents.value.find((document) => document.id === selectedDocuId.value)
);

const isDialogOpen = ref(false);
const selectedDocuId = ref<string>();

const columns: ColumnDef<Documents>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Name", h(CaretSortIcon, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => h("div", { class: "lowercase" }, row.getValue("name")),
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Category", h(CaretSortIcon, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) =>
      h("div", { class: "lowercase" }, row.getValue("category")),
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
      const status = row.getValue("status") as 0 | 1 | 2 | 3 | 4;
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
      const document = row.original.id;
      return h(
        Button,
        {
          variant: "outline",
          size: "sm",
          class: "bg-grass11 text-white",
          onClick: () => {
            selectedDocuId.value = document;
            isDialogOpen.value = true;
          },
        },
        () => "View"
      );
    },
  },
];

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const expanded = ref<ExpandedState>({});

const table = useVueTable({
  data: filteredDocuments,
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
  onRowSelectionChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, rowSelection),
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
    get rowSelection() {
      return rowSelection.value;
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
    title="Document Information"
    description="Information about documents with a status"
    closeText="Cancel"
    saveText="Approved"
  >
    <template #default>
      <div v-if="filteredDocuments">
        <StatusPage :selectedDocument="selectedDocument" />
      </div>
      <div v-else>
        <p>No document selected.</p>
      </div>
    </template>
  </CustomDialog>
  <div v-if="!isLoading" class="w-full">
    <div class="flex items-center py-4">
      <Input
        class="max-w-sm"
        placeholder="Filter documents..."
        :model-value="table.getColumn('name')?.getFilterValue() as string"
        @update:model-value="table.getColumn('name')?.setFilterValue($event)"
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
              <TableRow :data-state="row.getIsSelected() && 'selected'">
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
  margin-left: 15px !important;
}
</style>
