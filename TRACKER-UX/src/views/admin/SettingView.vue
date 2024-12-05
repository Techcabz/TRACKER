<script setup lang="ts">
import MiniLink from "@/components/general/breadcrumb/MiniLink.vue";
import AdminLayouts from "@/layouts/AdminLayouts.vue";
import { useAuthStore } from "@/stores/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Separator from "@/components/ui/separator/Separator.vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { onMounted, ref } from "vue";

const authStore = useAuthStore();

const username = ref("");
const email = ref("");
const status = ref("");
const role = ref("");
const firstName = ref("");
const lastName = ref("");
const position = ref("");

onMounted(() => {
  authStore.getUser();

  username.value = authStore.user.username || "";
  email.value = authStore.user.email || "";
  status.value =
    authStore.user?.status === 1
      ? "Approved"
      : authStore.user?.status === 0
      ? "pending"
      : "";
  role.value =
    authStore.user?.role_as === 1
      ? "Admin"
      : authStore.user?.role_as === 0
      ? "User"
      : "";
  firstName.value = authStore.user.personalDetails?.firstname || "";
  lastName.value = authStore.user.personalDetails?.lastname || "";
  position.value = authStore.user.personalDetails?.position || "";
});
</script>

<template>
  <AdminLayouts>
    <div class="flex flex-1 flex-col gap-2 p-2 lg:p-2">
      <div class="flex items-center justify-between">
        <!-- BreadCrumb -->
        <MiniLink />
        <!-- SearchBar -->
      </div>
      <Separator orientation="horizontal" />

      <Card>
        <CardHeader>
          <CardTitle>Login Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div class="grid grid-cols-2 gap-4">
              <div class="grid gap-2">
                <Label for="username">Username</Label>
                <Input
                  id="username"
                  v-model="username"
                  placeholder="Juan"
                  required
                />
              </div>
              <div class="grid gap-2">
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  v-model="email"
                  placeholder="example@example.com"
                  required
                />
              </div>
            </div>
            <div class="grid grid-cols-2 mt-3 gap-4">
              <div class="grid gap-2">
                <Label for="status">Status</Label>
                <Input id="status" v-model="status" readonly required />
              </div>
              <div class="grid gap-2">
                <Label for="role">User Role</Label>
                <Input id="role" v-model="role" readonly required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter class="border-t px-6 py-4">
          <!-- <Button
            class="bg-grass11 text-white rounded hover:bg-grass11 focus:ring-2 focus:ring-grass11 focus:ring-offset-2 focus:outline-none"
            >Save</Button
          > -->
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Used to identify you and determine your privileges.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div class="grid grid-cols-2 gap-4">
              <div class="grid gap-2">
                <Label for="first-name">First name</Label>
                <Input
                  id="first-name"
                  v-model="firstName"
                  placeholder="Juan"
                  required
                />
              </div>
              <div class="grid gap-2">
                <Label for="last-name">Last name</Label>
                <Input
                  id="last-name"
                  v-model="lastName"
                  placeholder="Dela Cruz"
                  required
                />
              </div>
            </div>
            <div class="grid gap-2 mt-2">
              <Label for="position">Position</Label>
              <Select v-model="position">
                <SelectTrigger>
                  <SelectValue :placeholder="position || 'Select a position'" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="faculty"> Faculty </SelectItem>
                  <SelectItem value="chairman"> Chairman </SelectItem>
                  <SelectItem value="dean"> Dean </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
        <CardFooter class="border-t px-6 py-4">
          <!-- <Button
            class="bg-grass11 text-white rounded hover:bg-grass11 focus:ring-2 focus:ring-grass11 focus:ring-offset-2 focus:outline-none"
            >Save</Button
          > -->
        </CardFooter>
      </Card>
    </div>
  </AdminLayouts>
</template>
