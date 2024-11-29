<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "radix-vue";
import { reactive, defineProps, defineEmits } from "vue";
import { useDocuStore } from "@/stores/document";
import Button from "@/components/ui/button/Button.vue";
import { useToast } from "@/components/ui/toast/use-toast";

const docuStore = useDocuStore();
const emit = defineEmits(["refresh-docu"]);
const { toast } = useToast();
// cloud config
const cloudName = "dqzl4gicv";
const uploadPreset = "banner";

const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
  },
  (error: any, result: any) => {
    if (!error && result && result.event === "success") {
      console.log(result.info);
    }
  }
);

const props = defineProps({
  closeDialog: {
    type: Function,
    required: true,
  },
});

const openWidget = () => {
  myWidget.open();
};
const formData = reactive({
  name: "",
  category: "",
});

const uploadFile = async () => {
  try {
    const formDataToSend = new FormData();

    formDataToSend.append("name", JSON.stringify(formData.name));
    formDataToSend.append("category", formData.category);

    await docuStore.uploadDocument(formData);

    toast({
      description: "Upload successfully.",
      class: "bg-green-500 text-white",
    });
    emit("refresh-docu");
    props.closeDialog();
    formData.name = "";
    formData.category = "";
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
        <Input id="name" type="text" v-model="formData.name" required />
      </div>

      <!-- Category Input -->
      <div class="grid w-full max-w-sm items-center gap-1.5">
        <Label for="category">Category</Label>
        <Input id="category" type="text" v-model="formData.category" required />
      </div>

      <!-- File Input (Optional) -->
      <!-- <div class="grid w-full max-w-sm items-center gap-1.5">
        <Label for="file">Picture/PDF (Optional)</Label>
        <Input
          id="file"
          type="file"
          accept=".png,.jpg,.jpeg,.pdf"
          @change="(e) => (formData.file = e.target.files[0])"
        />
      </div> -->
      <!-- <Button type="button"@click="openWidget">Upload</Button> -->
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
