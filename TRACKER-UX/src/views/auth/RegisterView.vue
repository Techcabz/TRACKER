<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { reactive } from "vue";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const { errors } = storeToRefs(useAuthStore());
const authStore = useAuthStore();

const register = async () => {
  try {
    await authStore.authenticate("register", formData); // Call authenticate action
  } catch (error) {
    console.error("Authentication failed:", error);
  }
};

interface FormData {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const formData = reactive<FormData>({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
});

</script>


<template>
    <Card class="mx-auto max-w-sm mt-12">
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
                        <Label for="email">Username</Label>
                        <Input id="username" type="text" placeholder="Username" v-model="formData.username" required />
                        <p v-if="errors.email">{{ errors.email[0] }}</p>
                    </div>
                    <div class="grid gap-2">
                        <Label for="email">Email</Label>
                        <Input id="email" type="email" placeholder="juan@example.com" v-model="formData.email"
                            required />
                        <p v-if="errors.email">{{ errors.email[0] }}</p>
                    </div>
                    <div class="grid gap-2">
                        <Label for="password">Password</Label>
                        <Input id="password" type="password" v-model="formData.password" />
                        <p v-if="errors.password">{{ errors.password[0] }}</p>
                    </div>
                    <div class="grid gap-2">
                        <Label for="password">Confirm Password</Label>
                        <Input type="password" v-model="formData.password_confirmation" />
                        <p v-if="errors.password_confirmation">{{ errors.password_confirmation[0] }}</p>

                    </div>
                    <Button type="submit" class="w-full bg-grass11 gap-1 text-white rounded hover:bg-grass11 focus:ring-2 focus:ring-grass11 focus:ring-offset-2 focus:outline-none ">
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

    <!-- <main :pageTitle="pageTitle">
      <h1 class="title">Register a new account</h1>
      <form
        @submit.prevent="authenticate('register', formData)"
        class="w-1/2 mx-auto space-y-6"
      >
      
        <div>
          <input type="text" placeholder="Email" v-model="formData.email" />
          <p v-if="errors.email">{{ errors.email[0] }}</p>
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"    
            v-model="formData.password"
          />
          <p v-if="errors.password">{{ errors.password[0] }}</p>
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            v-model="formData.password_confirmation"
          /> 
          <p v-if="errors.password_confirmation">{{ errors.password_confirmation[0] }}</p>
        </div>
        <div>
          <button class="primary-btn">Register</button>
        </div>
      </form>
    </main> -->
</template>