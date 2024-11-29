<script setup lang="ts">
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";

import {
  FilePlus,
  ClipboardCheck,
  FileCheck,
  CheckCircle,
} from "lucide-vue-next";
import { ref, onMounted, computed } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
onMounted(() => {
  authStore.getUser();
});

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { defineProps, defineEmits } from "vue";
import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label/Label.vue";
import { Button } from "@/components/ui/button";
const isNoTHighUser = computed(() => {
  if (authStore.user) {
    return (
      authStore.user?.personalDetails?.position === "chairman" ||
      authStore.user?.personalDetails?.position === "dean"
    );
  }
});

const steps = [
  {
    step: 1,
    title: "Faculty",
    description: "Upload the required documents for review.",
    icon: FilePlus,
  },
  {
    step: 2,
    title: "Chairman",
    description: "Review the uploaded documents for accuracy and validity.",
    icon: ClipboardCheck,
  },
  {
    step: 3,
    title: "Dean",
    description: "Approve the documents after final verification.",
    icon: FileCheck,
  },
  {
    step: 4,
    title: "Done",
    description: "The document submission process is complete.",
    icon: CheckCircle,
  },
];

const props = defineProps<{
  selectedDocument: {
    id: string;
    name: string;
    category: string;
    path: string;
    status: string;
  };
}>();

console.log(props.selectedDocument.name);

const currentStep = ref(2);
</script>

<template>
  <Stepper class="mb-3">
    <StepperItem
      v-for="item in steps"
      :key="item.step"
      class="basis-1/4"
      :step="item.step"
    >
      <StepperTrigger
        :class="{
          'pointer-events-none opacity-100': item.step !== currentStep,
        }"
      >
        <StepperIndicator>
          <component :is="item.icon" class="w-4 h-4" />
        </StepperIndicator>
        <div class="flex flex-col">
          <StepperTitle>
            {{ item.title }}
          </StepperTitle>
          <StepperDescription>
            {{ item.description }}
          </StepperDescription>
        </div>
      </StepperTrigger>
      <StepperSeparator
        v-if="item.step !== steps[steps.length - 1].step"
        class="w-full h-px"
      />
    </StepperItem>
  </Stepper>
  <div v-if="isNoTHighUser">
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
          <div class="flex flex-col gap-2 w-full"></div>
        </div>
      </CardContent>
    </Card>
    <div class="flex justify-end my-2">
      <Button
        class="relative uppercase bg-grass11 text-white rounded hover:bg-grass11 focus:ring-2 focus:ring-grass11 focus:ring-offset-2 focus:outline-none"
        >Approved as {{ authStore.user?.personalDetails?.position }}</Button
      >
    </div>
  </div>
</template>
