<script setup lang="jsx">
import MiniLink from '@/components/documents/breadcrumb/MiniLink.vue';
import DocuDialog from '@/components/documents/dialog/DocuDialog.vue';
import DocumentFilter from '@/components/documents/filters/DocumentFilter.vue';
import DocuUpload from '@/components/documents/form/DocuUpload.vue';
import Searchbar from '@/components/documents/searchbar/searchbar.vue';
import Button from '@/components/ui/button/Button.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import AdminLayouts from '@/layouts/AdminLayouts.vue';


</script>

<template>
  <AdminLayouts>
    <div class="flex flex-1 flex-col gap-2 p-2 lg:p-2">
      <div class="flex items-center justify-between">
        <!-- BreadCrumb -->
        <MiniLink />
        <!-- SearchBar -->
        <Searchbar />
      </div>
      <Separator orientation="horizontal" />
      <!-- filters -->
      <DocumentFilter />
      <div class="flex flex-1 flex-col gap-5">
        <div class="flex flex-0 items-center">
          <h1 class="text-lg font-semibold md:text-2xl">Documents</h1>
        </div>
        <div class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm py-5">
          <div class="flex flex-col items-center gap-3 text-center">
            <h3 class="text-2xl font-bold tracking-tight">
              You have no documents
            </h3>
            <p class="text-sm text-muted-foreground">
              You can get started as soon as you upload a document.
            </p>

            <DocuDialog title="Upload Documents" description="Please upload your document files below."
              closeText="Cancel" saveText="Upload">
              <template #trigger>
                <Button
                  class="mt-4 bg-grass11 text-white rounded hover:bg-grass11 focus:ring-2 focus:ring-grass11 focus:ring-offset-2 focus:outline-none">
                  Upload Documents
                </Button>

              </template>

              <template #default>
                <DocuUpload />
              </template>
            </DocuDialog>

          </div>
        </div>
      </div>
    </div>
  </AdminLayouts>
</template>