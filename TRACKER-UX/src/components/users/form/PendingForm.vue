<script setup lang="ts">
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input/Input.vue";
import Label from "@/components/ui/label/Label.vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { defineProps } from "vue";

defineProps({
  selectedUser: {
    type: Object,
    required: true,
  },
});

const cancelForm = () => {};

// Approve action: change the status of the user to "approved" (1)
const approveUser = () => {};
</script>

<template>
  <form>
    <div class="grid gap-4 mt-3">
      <div class="grid gap-2">
        <Label for="username">Username</Label>
        <Input
          id="username"
          type="text"
          readonly
          placeholder="Username"
          v-model="selectedUser.username"
          required
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="grid gap-2">
          <Label for="first-name">First name</Label>
          <Input
            id="first-name"
            placeholder="Juan"
            readonly
            v-model="selectedUser.firstname"
            required
          />
        </div>
        <div class="grid gap-2">
          <Label for="last-name">Last name</Label>
          <Input
            id="last-name"
            placeholder="Dela Cruz"
            readonly
            v-model="selectedUser.lastname"
            required
          />
        </div>
      </div>
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input
          id="email"
          type="email"
          readonly
          placeholder="juan@example.com"
          v-model="selectedUser.email"
          required
        />
      </div>
      <div class="grid gap-2 mt-2">
        <Label for="last-name">Position</Label>
        <Select v-model="selectedUser.position" disabled>
          <SelectTrigger>
            <SelectValue placeholder="Select a position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="faculty">Faculty</SelectItem>
            <SelectItem value="chairman">Chairman</SelectItem>
            <SelectItem value="dean">Dean</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Input type="hidden" v-model="selectedUser.id" required />
      <div class="mt-[25px] flex gap-4 justify-end">
        <Button
          type="button"
          class="bg-red4 text-red11 hover:bg-red5 focus:shadow-red4 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
          @click="cancelForm"
        >
          Cancel
        </Button>

        <Button
          type="button"
          class="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
          @click="approveUser"
        >
          Approve
        </Button>
      </div>
    </div>
  </form>
</template>
