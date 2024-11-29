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

import { FilePlus, ClipboardCheck, FileCheck, CheckCircle } from "lucide-vue-next";
import { ref } from "vue";

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

const currentStep = ref(2);
</script>

<template>
  <Stepper>
    <StepperItem
      v-for="item in steps"
      :key="item.step"
      class="basis-1/4"
      :step="item.step"
    >
      <StepperTrigger :class="{ 'pointer-events-none opacity-100': item.step !== currentStep }">
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
</template>
