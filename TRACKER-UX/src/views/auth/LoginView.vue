<script setup lang="ts">
import { reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useToast } from "@/components/ui/toast/use-toast";

// Import UI components
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const authStore = useAuthStore();
const { errors } = storeToRefs(authStore);
const { toast } = useToast();

const login = async () => {
  try {
    const res = await authStore.login(formData);

    if (res.success) {
      toast({
        description: "Login successful.",
        class: "bg-green-500 text-white",
      });
    } else {
      toast({
        description: "Login failed. Please check the errors.",
        class: "bg-red-500 text-white",
      });
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};

interface FormData {
  login: string;
  password: string;
}

const formData = reactive<FormData>({
  login: "",
  password: "",
});
</script>

<template>
  <Card class="mx-auto max-w-sm mt-12">
    <CardHeader>
      <CardTitle class="text-2xl">Login</CardTitle>
      <CardDescription>
        Enter your username or email below to login to your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="login">
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email or Username</Label>
            <Input
              type="text"
              placeholder="username or email"
              v-model="formData.login"
              required
            />
            <p v-if="errors.login" class="errors">
              {{ errors.login[0] }}
            </p>
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <a href="#" class="ml-auto inline-block text-sm underline">
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              v-model="formData.password"
              required
            />
            <p v-if="errors.password" class="errors">
              {{ errors.password[0] }}
            </p>
          </div>
          <Button
            type="submit"
            class="w-full bg-grass11 gap-1 text-white rounded hover:bg-grass11 focus:ring-2 focus:ring-grass11 focus:ring-offset-2 focus:outline-none"
          >
            Login
          </Button>
        </div>
      </form>
      <div class="mt-4 text-center text-sm">
        Don't have an account?
        <router-link :to="{ name: 'register' }" class="underline">
          Sign up
        </router-link>
      </div>
    </CardContent>
  </Card>
</template>
