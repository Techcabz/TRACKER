<script setup lang="jsx">
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { File, ListFilter, PlusCircle } from "lucide-vue-next";
import DocuDialog from "../dialog/DocuDialog.vue";
import DocuUpload from "../form/DocuUpload.vue";
</script>
<template>
  <div class="flex">
    <!-- <Tabs default-value="pending">
      <div class="hidden md:flex items-center">
        <TabsList>
          <TabsTrigger value="pending"> Pending </TabsTrigger>
          <TabsTrigger value="1"> Approved 1 </TabsTrigger>
          <TabsTrigger value="2"> Approved 2 </TabsTrigger>
          <TabsTrigger value="3"> Approved 3 </TabsTrigger>
          <TabsTrigger value="completed"> Completed </TabsTrigger>
        </TabsList>
      </div>
    </Tabs> -->

    <div class="ml-auto flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" size="sm" class="h-7 gap-1 rounded lg:hidden">
            <ListFilter class="h-3.5 w-3.5" />
            <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Filter
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="bg-white">
          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem checked> Active </DropdownMenuItem>
          <DropdownMenuItem>Draft</DropdownMenuItem>
          <DropdownMenuItem> Archived </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <!-- <Button size="sm" variant="outline"
        class="h-7 gap-1 rounded border-black text-black bg-transparent hover:bg-grass11 hover:text-white hover:border-grass11 focus:ring-2 focus:ring-grass11 focus:ring-offset-2 focus:outline-none">
        <File class="h-3.5 w-3.5" />
        <span class="sr-only sm:not-sr-only sm:whitespace-nowrap text-black hover:text-white">
          Export
        </span>
      </Button> -->

      <DocuDialog title="Upload Documents" description="Please upload your document files below." closeText="Cancel"
        saveText="Upload">
        <template #trigger>
          <Button size="sm"
            class="h-7  bg-grass11 gap-1 text-white rounded hover:bg-grass11 focus:ring-2 focus:ring-grass11 focus:ring-offset-2 focus:outline-none ">
            <PlusCircle class="h-3.5 w-3.5 text-white" />
            <span class="sr-only sm:not-sr-only sm:whitespace-nowrap ">
              Upload Documents
            </span>
          </Button>
        </template>

        <template #default>
         <DocuUpload />
        </template>
      </DocuDialog>



    </div>
  </div>
</template>
