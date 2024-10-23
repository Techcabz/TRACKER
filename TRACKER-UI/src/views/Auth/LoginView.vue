<script setup>
import { useAuthStore } from "@/stores/auth";
import { reactive, ref } from "vue";

const authStore = useAuthStore();

const formData = reactive({
  email: "",
  password: "",
});

const pageTitle = ref("Login");
</script>

<template>
  <main :pageTitle="pageTitle">
    <h1 class="title">Login your account {{ authStore.userAge }}</h1>
    <form
      @submit.prevent="console.log(formData)"
      class="w-1/2 mx-auto space-y-6"
    >
      <div>
        <input type="text" placeholder="Name" v-model="formData.name" />
      </div>
      <div>
        <input type="text" placeholder="Email" v-model="formData.email" />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          v-model="formData.password"
        />
      </div>

      <div>
        <button class="primary-btn">Login</button>
      </div>
    </form>
  </main>
</template>
