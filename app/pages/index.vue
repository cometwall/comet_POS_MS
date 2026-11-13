<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  publico: true
})

const auth = useAuthStore()

await navigateTo(auth.estaAutenticado ? '/dashboard' : '/login', { replace: true })
</script>

<template>
  <div />
</template>
