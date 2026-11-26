<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()

const passwordActual = ref('')
const passwordNueva = ref('')
const cargando = ref(false)
const errorGeneral = ref('')
const exito = ref(false)

async function onSubmit() {
    errorGeneral.value = ''
    exito.value = false
    cargando.value = true

    try {
        await auth.cambiarPassword({
            passwordActual: passwordActual.value,
            passwordNueva: passwordNueva.value
        })
        exito.value = true
        passwordActual.value = ''
        passwordNueva.value = ''
    } catch (error: any) {
        errorGeneral.value = typeof error.data === 'string' ? error.data : 'No se pudo cambiar la contraseña.'
    } finally {
        cargando.value = false
    }
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4 max-w-sm">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña actual</label>
      <input
        v-model="passwordActual"
        type="password"
        autocomplete="current-password"
        required
        class="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña nueva</label>
      <input
        v-model="passwordNueva"
        type="password"
        autocomplete="new-password"
        required
        class="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>

    <p v-if="errorGeneral" class="text-sm text-red-600">{{ errorGeneral }}</p>
    <p v-if="exito" class="text-sm text-green-600">Contraseña actualizada.</p>

    <button
      type="submit"
      :disabled="cargando"
      class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {{ cargando ? 'Guardando...' : 'Cambiar contraseña' }}
    </button>
  </form>
</template>
