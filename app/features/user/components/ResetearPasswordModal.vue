<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import type { UsuarioDto } from '~/types/user'

const props = defineProps<{
    abierto: boolean
    usuario: UsuarioDto | null
}>()

const emit = defineEmits<{
    cerrar: []
}>()

const userStore = useUserStore()

const passwordNueva = ref('')
const cargando = ref(false)
const errorGeneral = ref('')

watch(() => props.abierto, (abierto) => {
    if (abierto) {
        passwordNueva.value = ''
        errorGeneral.value = ''
    }
})

async function onSubmit() {
    if (!props.usuario) {
        return
    }

    errorGeneral.value = ''
    cargando.value = true

    try {
        await userStore.resetearPassword(props.usuario.id, { passwordNueva: passwordNueva.value })
        emit('cerrar')
    } catch (error: any) {
        errorGeneral.value = typeof error.data === 'string' ? error.data : 'No se pudo restablecer la contraseña.'
    } finally {
        cargando.value = false
    }
}
</script>

<template>
  <div v-if="abierto" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    <div class="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
      <h3 class="text-lg font-bold text-gray-900 mb-4">
        Restablecer contraseña de {{ usuario?.nombre }}
      </h3>

      <form @submit.prevent="onSubmit" class="space-y-4">
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

        <div class="flex justify-end gap-2 pt-2">
          <button
            type="button"
            @click="emit('cerrar')"
            class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="cargando"
            class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {{ cargando ? 'Guardando...' : 'Restablecer' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
