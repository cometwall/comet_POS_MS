<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  rolMinimo: 'Cajero'
})

const auth = useAuthStore()
</script>

<template>
  <div class="max-w-2xl mx-auto py-10 px-4">
    <h1 class="text-2xl font-bold text-gray-900">
      Dashboard
    </h1>

    <p class="mt-2 text-sm text-gray-600">
      Bienvenido, {{ auth.usuario?.nombre }}.
    </p>

    <div class="mt-6 rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700">
      <p><span class="font-medium">Rol:</span> {{ auth.usuario?.rol }}</p>
      <p><span class="font-medium">Sucursal:</span> {{ auth.usuario?.sucursalId ?? 'Sin asignar' }}</p>
    </div>
  </div>
</template>
