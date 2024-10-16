<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
   
      <nav>
        <RouterLink class="nav-link" :to="{ name: 'home'}">Home</RouterLink>
        
        <div>
          <RouterLink class="nav-link" :to="{ name: 'register'}">Register</RouterLink>
        
        </div>
      </nav>
    
  </header>

  <RouterView />
</template>
