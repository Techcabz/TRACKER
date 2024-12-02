<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { reactive, defineProps, defineEmits, ref, PropType } from "vue";
import { useDocuStore } from "@/stores/document";
import { useToast } from "@/components/ui/toast/use-toast";
import { Button } from "@/components/ui/button";

// Store and utility initialization
const docuStore = useDocuStore();
const emit = defineEmits(["refresh-docu"]);
const { toast } = useToast();

// Props definition
const props = defineProps({
  closeDialog: {
    type: Function as PropType<() => void>,
    required: true,
  },
});

// Reactive form data and loading state
const isLoading = ref(false);
const formData = reactive({
  file: null as File | null,
  name: "",
  category: "",
});

// Upload file method
const uploadFile = async () => {
  if (!formData.file) {
    toast({
      description: "Please select a file to upload.",
      class: "bg-red-500 text-white",
    });
    return;
  }

  isLoading.value = true;

  try {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("file", formData.file);

    const response = await docuStore.uploadDocument(formDataToSend);

    toast({
      description: "Uploaded successfully.",
      class: "bg-green-500 text-white",
    });

    emit("refresh-docu");
    props.closeDialog();

    // Clear form data
    formData.name = "";
    formData.category = "";
    formData.file = null;
  } catch (error) {
    toast({
      description: error.message || "Upload failed. Please try again.",
      class: "bg-red-500 text-white",
    });
  } finally {
    isLoading.value = false;
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

      <!-- File Input (Optional) -->
      <div class="grid w-full max-w-sm items-center gap-1.5">
        <Label for="file">Picture/PDF (Optional)</Label>
        <Input
          id="file"
          type="file"
          ref="file"
          accept=".png,.jpg,.jpeg,.pdf"
          @change="(e) => (formData.file = e.target.files[0])"
        />
      </div>
      <!-- <Button type="button"@click="openWidget">Upload</Button> -->
    </div>

    <!-- Buttons -->
    <div class="mt-[25px] flex gap-4 justify-end">
      <Button
        type="button"
        @click="props.closeDialog"
        class="bg-red4 text-red11 hover:bg-red5 focus:shadow-red4 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
      >
        Cancel
      </Button>

      <Button
        type="submit"
        :disabled="isLoading"
        class="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
      >
        <span v-if="isLoading">Uploading...</span>

        <span v-else>Upload</span>
      </Button>
    </div>
  </form>
</template>
