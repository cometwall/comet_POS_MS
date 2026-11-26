<script setup lang="ts">
import LoginForm from '~/features/auth/components/LoginForm.vue'

definePageMeta({
  publico: true,
  layout: 'auth'
})
</script>

<template>
  <LoginForm />
</template>