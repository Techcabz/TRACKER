<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
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
const isSubmitting = ref(false);

const register = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;

  try {
    const res = await authStore.register(formData);

    if (res.success) {
      toast({
        description: "Registration successful. Please wait for admin approval.",
        class: "bg-green-500 text-white",
      });

      // Reset form fields
      formData.username = "";
      formData.email = "";
      formData.fname = "";
      formData.lname = "";
      formData.position = "";
      formData.password = "";
      formData.password_confirmation = "";
    } else {
      toast({
        description: Object.values(res.errors).flat().join(", "),
        class: "bg-red-500 text-white",
      });
    }
  } catch (error) {
    if (error.response && error.response.data.errors) {
      const errors = error.response.data.errors;

      if (errors.login) {
        toast({
          description: errors.login[0],
          class: "bg-red-500 text-white",
        });
      } else {
        toast({
          description: "Registration failed. Please check your inputs.",
          class: "bg-red-500 text-white",
        });
      }
    } else {
      toast({
        description: "An unexpected error occurred. Please try again later.",
        class: "bg-red-500 text-white",
      });
    }

    console.error("Registration error:", error);
  } finally {
    isSubmitting.value = false;
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
            <p v-if="errors.username" class="errors">
              {{ errors.username[0] }}
            </p>
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
            <p v-if="errors.position" class="errors">
              {{ errors.position[0] }}
            </p>
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input id="password" type="password" v-model="formData.password" />
            <p v-if="errors.password" class="errors">
              {{ errors.password[0] }}
            </p>
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
            :disabled="isSubmitting"
            class="w-full bg-grass11 text-white rounded hover:bg-grass11 focus:ring-2 focus:ring-grass11 focus:ring-offset-2 focus:outline-none flex items-center justify-center"
          >
            <span v-if="!isSubmitting">Create an account</span>
            <span v-else class="loading-spinner mr-2"></span>
            <!-- Loading Spinner -->
            <span v-if="isSubmitting">Submitting...</span>
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
<style lang="css" scoped>
.loading-spinner {
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
