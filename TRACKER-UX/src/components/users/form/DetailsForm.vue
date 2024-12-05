<script setup lang="ts">

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

// Define the prop for selectedUser
defineProps({
  selectedUser: {
    type: Object,
    required: true,
  },
});
</script>

<template>
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

    <Input id="email" type="hidden" v-model="selectedUser.id" required />
  </div>
</template>
