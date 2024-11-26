<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogClose } from 'radix-vue';
import { ref } from 'vue';
import { useDocuStore } from "@/stores/document";

const docuStore = useDocuStore();

const formData = ref({
  name: "",
  category: "",
  file: null as File | null,
});

const uploadFile = async () => {
  const payload = new FormData();
  payload.append("name", formData.value.name);
  payload.append("category", formData.value.category);
  payload.append("status", "0");

  if (formData.value.file) {
    payload.append("file", formData.value.file);
  } else {
    alert("Please select a file.");
    return;
  }
  console.log(formData)
  console.log("FormData contents:");
  for (const pair of payload.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  try {
    for (const pair of payload.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
      await docuStore.uploadDocument(payload);
    }

    alert("Document uploaded successfully!");

    // Reset the form data
    formData.value.name = "";
    formData.value.category = "";
    formData.value.file = null;
  } catch (error) {
    console.error("Upload failed:", docuStore.errors);
  }
};
</script>

<template>
  <form @submit.prevent="uploadFile" enctype="multipart/form-data">
    <div class="grid gap-2">
      <!-- Name Input -->
      <div class="grid w-full max-w-sm items-center gap-1.5">
        <Label for="name">Name</Label>
        <Input id="name" type="text" v-model="formData.name" required />
      </div>

      <!-- Category Input -->
      <div class="grid w-full max-w-sm items-center gap-1.5">
        <Label for="category">Category</Label>
        <Input id="category" type="text" v-model="formData.category" required />
      </div>

      <!-- File Input -->
      <div class="grid w-full max-w-sm items-center gap-1.5">
        <Label for="file">Picture/PDF</Label>
        <Input id="file" type="file" accept=".png,.jpg,.jpeg,.pdf" @change="(e) => (formData.file = e.target.files[0])"
          required />
      </div>
    </div>

    <!-- Buttons -->
    <div class="mt-[25px] flex gap-4 justify-end">
      <DialogClose as-child>
        <button type="button"
          class="bg-red4 text-red11 hover:bg-red5 focus:shadow-red4 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
          Cancel
        </button>
      </DialogClose>

      <button type="submit"
        class="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
        Upload
      </button>
    </div>
  </form>
</template>
