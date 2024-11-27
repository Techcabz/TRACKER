<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { reactive } from "vue";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const { errors } = storeToRefs(useAuthStore());
const authStore = useAuthStore();
const { toast } = useToast();

const register = async () => {
  try {
    const res = await authStore.register(formData);

    if (res.success) {
      toast({
        description: "Registration successful. Please wait for admin approval.",
        class: "bg-green-500 text-white",
      });
    } else {
      toast({
        description: "Registration failed. Please check the errors.",
        class: "bg-red-500 text-white",
      });
    }
  } catch (error) {
    console.error("Registration failed:", error);
  }
};

interface FormData {
  username: string;
  email: string;
  fname: string;
  lname: string;
  position: string;
  password: string;
  password_confirmation: string;
}

const formData = reactive<FormData>({
  username: "",
  email: "",
  fname: "",
  lname: "",
  position: "",
  password: "",
  password_confirmation: "",
});
</script>

<template>
  <Card class="mx-auto max-w-sm mt-12 mb-12">
    <CardHeader>
      <CardTitle class="text-xl"> Sign Up </CardTitle>
      <CardDescription>
        Enter your information to create an account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="register">
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              v-model="formData.username"
              required
            />
            <p v-if="errors.username" class="errors">{{ errors.username[0] }}</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label for="first-name">First name</Label>
              <Input
                id="first-name"
                placeholder="Juan"
                v-model="formData.fname"
                required
              />
              <p v-if="errors.fname" class="errors">{{ errors.fname[0] }}</p>
            </div>
            <div class="grid gap-2">
              <Label for="last-name">Last name</Label>
              <Input
                id="last-name"
                placeholder="Dela Cruz"
                v-model="formData.lname"
                required
              />
              <p v-if="errors.lname" class="errors">{{ errors.lname[0] }}</p>
            </div>
          </div>
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="juan@example.com"
              v-model="formData.email"
              required
            />
            <p v-if="errors.email" class="errors">{{ errors.email[0] }}</p>
          </div>
          <div class="grid gap-2 mt-2">
            <Label for="last-name">Position</Label>
            <Select v-model="formData.position">
              <SelectTrigger>
                <SelectValue placeholder="Select a position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="faculty">Faculty</SelectItem>
                <SelectItem value="chairman">Chairman</SelectItem>
                <SelectItem value="dean">Dean</SelectItem>
              </SelectContent>
            </Select>
            <p v-if="errors.position" class="errors">{{ errors.position[0] }}</p>
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input id="password" type="password" v-model="formData.password" />
            <p v-if="errors.password" class="errors">{{ errors.password[0] }}</p>
          </div>
          <div class="grid gap-2">
            <Label for="password">Confirm Password</Label>
            <Input type="password" v-model="formData.password_confirmation" />
            <p v-if="errors.password_confirmation" class="errors">
              {{ errors.password_confirmation[0] }}
            </p>
          </div>
          <Button
            type="submit"
            class="w-full bg-grass11 gap-1 text-white rounded hover:bg-grass11 focus:ring-2 focus:ring-grass11 focus:ring-offset-2 focus:outline-none"
          >
            Create an account
          </Button>
        </div>
      </form>
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <router-link :to="{ name: 'login' }" class="underline">
          Sign in
        </router-link>
      </div>
    </CardContent>
  </Card>
</template>
