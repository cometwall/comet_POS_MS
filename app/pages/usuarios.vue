<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useUserStore } from '~/stores/user'
import CambiarPasswordForm from '~/features/auth/components/CambiarPasswordForm.vue'
import TablaUsuarios from '~/features/user/components/TablaUsuarios.vue'

definePageMeta({
  rolMinimo: 'Cajero'
})

const auth = useAuthStore()
const userStore = useUserStore()

const puedeGestionarUsuarios = computed(() => auth.tieneNivel('Admin'))
const puedeCambiarPassword = computed(() => auth.tieneRol('SuperAdmin'))

if (puedeGestionarUsuarios.value) {
  await userStore.listarUsuarios()
}

async function onLogout() {
  await auth.logout()
  await navigateTo('/login')
}
</script>

<template>
  <div class="max-w-5xl mx-auto py-10 px-4 space-y-8">
    <!-- Perfil propio -->
    <section class="rounded-lg border border-gray-200 bg-white p-6 flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold text-gray-900">
          {{ auth.usuario?.nombre }}
        </h1>
        <p class="text-sm text-gray-600">
          {{ auth.usuario?.rol }} · Sucursal {{ auth.usuario?.sucursalId ?? 'Sin asignar' }}
        </p>
      </div>

      <button
        @click="onLogout"
        class="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900"
      >
        Cerrar sesión
      </button>
    </section>

    <!-- Solo SuperAdmin puede cambiar su propia contraseña (restricción del backend) -->
    <section v-if="puedeCambiarPassword" class="rounded-lg border border-gray-200 bg-white p-6">
      <h2 class="text-lg font-bold text-gray-900 mb-4">
        Cambiar mi contraseña
      </h2>
      <CambiarPasswordForm />
    </section>

    <!-- Solo Admin y SuperAdmin gestionan usuarios -->
    <section v-if="puedeGestionarUsuarios" class="rounded-lg border border-gray-200 bg-white p-6">
      <h2 class="text-lg font-bold text-gray-900 mb-4">
        Gestión de usuarios
      </h2>
      <TablaUsuarios />
    </section>
  </div>
</template>
