<script setup>
import { useAuthStore } from '@/stores/auth';
import { reactive , ref} from 'vue';

const authStore = useAuthStore()
const pageTitle = ref("Register");
const formData = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})


</script>

<template>
  <main :pageTitle="pageTitle">
    <h1 class="title">Register a new account {{ authStore.userAge  }}</h1>
    <form @submit.prevent="console.log(formData)" class="w-1/2 mx-auto space-y-6">
      <div>
        <input type="text" placeholder="Name" v-model="formData.name" />
      </div>
      <div>
        <input type="text" placeholder="Email" v-model="formData.email" />
      </div>
      <div>
        <input type="password" placeholder="Password" v-model="formData.password" />
      </div>
      <div>
        <input type="password" placeholder="Confirm Password" v-model="formData.password_confirmation" />
      </div>
      <div>
        <button class="primary-btn">Register</button>
      </div>
    </form>
  </main>
</template>
