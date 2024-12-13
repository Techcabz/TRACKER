<script setup lang="ts">
import {
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperRoot,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "radix-vue";

import {
  FilePlus,
  ClipboardCheck,
  FileCheck,
  CheckCircle,
  Undo2,
} from "lucide-vue-next";
import { ref, onMounted, computed } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const docuStore = useDocuStore();

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { defineProps } from "vue";
import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label/Label.vue";
import { Button } from "@/components/ui/button";
import { useDocuStore } from "@/stores/document";
import { useToast } from "@/components/ui/toast/use-toast";
import { Textarea } from "@/components/ui/textarea";
const emit = defineEmits(["update:isDialogOpen", "refresh-docu"]);

const closeDialog = () => {
  emit("update:isDialogOpen", false);
};

const isAdmin = computed(() => {
  if (authStore.user) {
    return authStore.user?.role == "1";
  }
});
const remark = ref("");
const remarks = ref("");
const { toast } = useToast();
const isNoTHighUser = computed(() => {
  if (authStore.user) {
    return (
      authStore.user?.personalDetails?.position === "chairman" ||
      authStore.user?.personalDetails?.position === "dean"
    );
  }
});

const isFacultyhUser = computed(() => {
  if (authStore.user) {
    return authStore.user?.personalDetails?.position === "faculty";
  }
});

const steps = [
  {
    step: 0,
    title: "Faculty",
    description: "Upload the required documents for review.",
    icon: FilePlus,
  },
  {
    step: 1,
    title: "Chairman",
    description: "Review the uploaded documents for accuracy and validity.",
    icon: ClipboardCheck,
  },
  {
    step: 2,
    title: "Dean",
    description: "Approve the documents after final verification.",
    icon: FileCheck,
  },
  {
    step: 3,
    title: "Done",
    description: "The document submission process is complete.",
    icon: CheckCircle,
  },
  {
    step: 4,
    title: "Disapproved",
    description: "You can now read the remarks for further clarification.",
    icon: Undo2,
  },
];

const props = defineProps<{
  selectedDocument: {
    id: string;
    name: string;
    category: string;
    file_path: string;
    status: string;
  };
}>();

onMounted(async () => {
  authStore.getUser();
  try {
    const data = await docuStore.getRemarks(props.selectedDocument.id);

    if (data && data.remark) {
      remarks.value = data?.remark || "";
    } else {
      remarks.value = "";
    }
  } catch (error) {
    console.error("Error fetching remarks:", error);
  }
});

const currentStep = ref(Number(props.selectedDocument.status));

const viewDocument = async () => {
  if (props.selectedDocument.file_path) {
    const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
    const publicFileUrl = `${apiUrl}/storage/${props.selectedDocument.file_path}`;

    window.open(publicFileUrl, "_blank");
  } else {
    toast({
      description: "Document not available.",
      class: "bg-red-500 text-white",
    });
  }
};

const canApproveAsChairman = computed(() => {
  return (
    authStore.user?.personalDetails?.position === "chairman" &&
    Number(props.selectedDocument.status) === 0
  );
});

const canApproveAsDean = computed(() => {
  return (
    authStore.user?.personalDetails?.position === "dean" &&
    Number(props.selectedDocument.status) === 1
  );
});

const disapprovedAsChairman = async () => {
  try {
    const data = {
      document_id: Number(props.selectedDocument.id),
      remark: remark.value,
    };

    const response = await docuStore.submitDisapproval(
      data.document_id,
      data.remark
    );

    await docuStore.changeStatus(Number(props.selectedDocument.id), 4);

    if (response.success) {
      toast({
        description: "Remarks submitted successfully.",
        class: "bg-green-500 text-white",
      });
      emit("refresh-docu");
      closeDialog();
    } else {
      toast({
        description: "Document disapproval failed. Please check the errors.",
        class: "bg-red-500 text-white",
      });
    }
  } catch (error) {
    console.error("Error during disapproval:", error);
    toast({
      description: "Something went wrong while disapproving the document.",
      class: "bg-red-500 text-white",
    });
  }
};

const approveAsChairman = async () => {
  try {
    const res = await docuStore.changeStatus(
      Number(props.selectedDocument.id),
      1
    );
    if (res.success) {
      toast({
        description: "Document approved successfully.",
        class: "bg-green-500 text-white",
      });
      emit("refresh-docu");
      closeDialog();
    } else {
      toast({
        description: "Document approval failed. Please check the errors.",
        class: "bg-red-500 text-white",
      });
    }
  } catch (error) {
    console.error("Error during approval:", error);
    toast({
      description: "Something went wrong while approving the document.",
      class: "bg-red-500 text-white",
    });
  }
};

const approveAsDean = async () => {
  try {
    const res = await docuStore.changeStatus(
      Number(props.selectedDocument.id),
      3
    );
    if (res.success) {
      toast({
        description: "Document approved successfully.",
        class: "bg-green-500 text-white",
      });
      emit("refresh-docu");
      closeDialog();
    } else {
      toast({
        description: "Document approval failed. Please check the errors.",
        class: "bg-red-500 text-white",
      });
    }
  } catch (error) {
    console.error("Error during approval:", error);
    toast({
      description: "Something went wrong while approving the document.",
      class: "bg-red-500 text-white",
    });
  }
};
</script>

<template>
  <StepperRoot
    :default-value="currentStep"
    :class="[
      'flex gap-2 m-auto w-full max-w-[32rem]',
      isNoTHighUser ? 'py-5' : 'py-20',
    ]"
  >
    <StepperItem
      v-for="item in steps"
      :key="item.step"
      class="w-full flex justify-center gap-2 cursor-pointer group relative px-4"
      :step="item.step"
      :disabled="true"
    >
      <StepperTrigger
        class="inline-flex items-center justify-center rounded-full w-10 h-10 bg-gray-300 text-white group-data-[state=active]:bg-green11 group-data-[state=active]:text-white group-data-[state=completed]:bg-white group-data-[state=completed]:text-green10"
      >
        <StepperIndicator class="flex justify-center items-center w-6 h-6">
          <component :is="item.icon" class="w-5 h-5 text-white" />
        </StepperIndicator>
      </StepperTrigger>
      <StepperSeparator
        v-if="item.step !== steps[steps.length - 1].step"
        class="absolute top-5 left-[calc(50%+30px)] right-[calc(-50%+20px)] h-0.5 bg-gray-300"
      />
      <div class="absolute text-center top-full left-0 w-full mt-2">
        <StepperTitle class="font-medium text-grass12">{{
          item.title
        }}</StepperTitle>
        <StepperDescription class="hidden sm:block text-xs text-grass12">{{
          item.description
        }}</StepperDescription>
      </div>
    </StepperItem>
  </StepperRoot>

  <div v-if="isAdmin" class="mt-12">
    <Separator class="my-4" label="Documents Information" />
    <Card>
      <CardContent>
        <div class="flex mt-3 items-center w-full p-3 gap-4">
          <!-- Left Content Section -->
          <div class="flex flex-col gap-2 w-full">
            <div class="flex flex-col">
              <Label for="name" class="mb-2">Name</Label>
              <Input readonly v-model="selectedDocument.name" />
            </div>
            <div class="flex flex-col">
              <Label for="category" class="mb-2">Category</Label>
              <Input readonly v-model="selectedDocument.category" />
            </div>
          </div>

          <!-- Right Content Section -->
          <div class="flex flex-col gap-2 w-full">
            <div class="flex flex-col">
              <Label for="category" class="mb-2">View document here:</Label>
              <Button
                variant="outline"
                @click="viewDocument"
                class="bg-grass11 text-white hover:bg-green-700 hover:text-white focus:ring-4 focus:ring-green-300 rounded-md py-2 px-4 flex items-center"
              >
                <svg
                  class="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 3a1 1 0 011 1v7.586l3.707-3.707a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L8 11.586V4a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                Download Document
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>

  <div v-if="isFacultyhUser" class="mt-12">
    <Separator class="my-4" label="Documents Information" />
    <Card>
      <CardContent>
        <div class="flex mt-3 items-center w-full p-3 gap-4">
          <!-- Left Content Section -->
          <div class="flex flex-col gap-2 w-full">
            <div class="flex flex-col">
              <Label for="name" class="mb-2">Name</Label>
              <Input readonly v-model="selectedDocument.name" />
            </div>
            <div class="flex flex-col">
              <Label for="category" class="mb-2">Category</Label>
              <Input readonly v-model="selectedDocument.category" />
            </div>
          </div>

          <!-- Right Content Section -->
          <div class="flex flex-col gap-2 w-full">
            <div
              v-if="remarks.trim() !== ''"
              class="grid border-2 border-dashed border-red-500 p-2"
            >
              <Label class="mb-2">Remarks:</Label>
              <div class="flex">
                <Textarea readonly v-model="remarks" />
              </div>
            </div>
            <div class="flex flex-col">
              <Label for="category" class="mb-2">View document here:</Label>
              <Button
                variant="outline"
                @click="viewDocument"
                class="bg-grass11 text-white hover:bg-green-700 hover:text-white focus:ring-4 focus:ring-green-300 rounded-md py-2 px-4 flex items-center"
              >
                <svg
                  class="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 3a1 1 0 011 1v7.586l3.707-3.707a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L8 11.586V4a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                Download Document
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
  <div v-if="isNoTHighUser" class="custom-m">
    <Separator class="my-4" label="Documents Information" />
    <Card>
      <CardContent>
        <div class="flex mt-3 items-center w-full p-3 gap-4">
          <!-- Left Content Section -->
          <div class="flex flex-col gap-2 w-full">
            <div class="flex flex-col">
              <Label for="name" class="mb-2">Name</Label>
              <Input readonly v-model="selectedDocument.name" />
            </div>
            <div class="flex flex-col">
              <Label for="category" class="mb-2">Category</Label>
              <Input readonly v-model="selectedDocument.category" />
            </div>
          </div>

          <!-- Right Content Section -->
          <div class="flex flex-col gap-2 w-full">
            <div class="flex flex-col">
              <Label for="category" class="mb-2">View document here:</Label>
              <Button
                variant="outline"
                @click="viewDocument"
                class="bg-grass11 text-white hover:bg-green-700 hover:text-white focus:ring-4 focus:ring-green-300 rounded-md py-2 px-4 flex items-center"
              >
                <svg
                  class="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 3a1 1 0 011 1v7.586l3.707-3.707a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L8 11.586V4a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                Download Document
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    <div v-if="canApproveAsChairman" class="flex justify-end my-2 gap-3">
      <DialogRoot>
        <DialogTrigger
          class="bg-red9 font-semibold shadow-blackA7 hover:bg-red11 inline-flex h-[35px] items-center justify-center rounded-[4px] text-white px-[15px] leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
        >
          Disapproved
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay
            class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30"
          />
          <DialogContent
            class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
          >
            <DialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
              Remarks
            </DialogTitle>
            <div class="flex flex-col my-5">
              <Textarea v-model="remark" placeholder="Enter remarks here..." />
            </div>

            <div class="flex justify-end gap-5">
              <DialogClose as-child>
                <button
                  class="bg-red4 text-red11 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                >
                  Close
                </button>
              </DialogClose>
              <Button
                class="relative uppercase bg-grass11 text-white rounded hover:bg-grass11 focus:ring-2 focus:ring-grass11 focus:ring-offset-2 focus:outline-none"
                @click="disapprovedAsChairman"
              >
                Submit
              </Button>
            </div>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
      <Button
        class="relative uppercase bg-grass11 text-white rounded hover:bg-grass11 focus:ring-2 focus:ring-grass11 focus:ring-offset-2 focus:outline-none"
        @click="approveAsChairman"
      >
        Approve as Chairman
      </Button>
    </div>

    <!-- Dean approval button (visible when status is 1 and user is Dean) -->
    <div v-if="canApproveAsDean" class="flex justify-end my-2">
      <Button
        class="relative uppercase bg-grass11 text-white rounded hover:bg-grass11 focus:ring-2 focus:ring-grass11 focus:ring-offset-2 focus:outline-none"
        @click="approveAsDean"
      >
        Approve as Dean
      </Button>
    </div>
  </div>
</template>
<style lang="css" scoped>
.custom-m {
  margin-top: 120px;
}
</style>
