<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "radix-vue";
import { reactive, ref } from "vue";
import { useDocuStore } from "@/stores/document";

const docuStore = useDocuStore();

const formData = ref({
  name: "",
  category: "",
});

const formdata = reactive({
  name: "",
  category: "",
});


const uploadFile = async () => {
  // if (!formData.value.file) {
  //   alert("Please select a file.");
  //   return;
  // }

  // console.log(formData.value.file);

  
  const payload = new FormData();
  payload.append("name", formData.value.name);
  payload.append("category", formData.value.category);
  
  // Append the file as a File object instead of base64 string
  //payload.append("file", formData.value.file);

  try {
    // Use the store's uploadDocument method with FormData
    await docuStore.uploadDocument(payload);

    alert("Document uploaded successfully!");

    // Reset the form data after upload
    formData.value.name = "";
    formData.value.category = "";
    // formData.value.file = null;
  } catch (error) {
    console.error("Upload failed:", error);
    alert("Upload failed. Please try again.");
  }
};

</script>

<template>
  <form @submit.prevent="uploadFile" enctype="multipart/form-data">
    <div class="grid gap-2">
      <!-- Name Input -->
      <div class="grid w-full max-w-sm items-center gap-1.5">
        <Label for="name">Name</Label>
        <Input id="name" type="text" v-model="formdata.name" required />
      </div>

      <!-- Category Input -->
      <div class="grid w-full max-w-sm items-center gap-1.5">
        <Label for="category">Category</Label>
        <Input id="category" type="text" v-model="formData.category" required />
      </div>

      <!-- File Input -->
      <div class="grid w-full max-w-sm items-center gap-1.5">
        <Label for="file">Picture/PDF</Label>
        <Input
          id="file"
          type="file"
          accept=".png,.jpg,.jpeg,.pdf"
          @change="(e) => (formData.file = e.target.files[0])"
          required
        />
      </div>
    </div>

    <!-- Buttons -->
    <div class="mt-[25px] flex gap-4 justify-end">
      <DialogClose as-child>
        <button
          type="button"
          class="bg-red4 text-red11 hover:bg-red5 focus:shadow-red4 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
        >
          Cancel
        </button>
      </DialogClose>

      <button
        type="submit"
        class="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
      >
        Upload
      </button>
    </div>
  </form>
</template>
