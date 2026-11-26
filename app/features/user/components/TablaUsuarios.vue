<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import UsuarioFormModal from './UsuarioFormModal.vue'
import ResetearPasswordModal from './ResetearPasswordModal.vue'
import type { UsuarioDto } from '~/types/user'

const userStore = useUserStore()

const modalFormAbierto = ref(false)
const usuarioEditando = ref<UsuarioDto | null>(null)

const modalPasswordAbierto = ref(false)
const usuarioParaResetear = ref<UsuarioDto | null>(null)

const errorAccion = ref('')

function abrirCrear() {
    usuarioEditando.value = null
    modalFormAbierto.value = true
}

function abrirEditar(usuario: UsuarioDto) {
    usuarioEditando.value = usuario
    modalFormAbierto.value = true
}

function abrirResetearPassword(usuario: UsuarioDto) {
    usuarioParaResetear.value = usuario
    modalPasswordAbierto.value = true
}

async function toggleActivo(usuario: UsuarioDto) {
    errorAccion.value = ''

    try {
        if (usuario.activo) {
            await userStore.desactivar(usuario.id)
        } else {
            await userStore.activar(usuario.id)
        }
    } catch (error: any) {
        errorAccion.value = typeof error.data === 'string' ? error.data : 'No se pudo completar la acción.'
    }
}

async function desbloquear(usuario: UsuarioDto) {
    errorAccion.value = ''

    try {
        await userStore.desbloquear(usuario.id)
    } catch (error: any) {
        errorAccion.value = typeof error.data === 'string' ? error.data : 'No se pudo desbloquear al usuario.'
    }
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <p v-if="userStore.cargando" class="text-sm text-gray-500">Cargando...</p>
      <button
        @click="abrirCrear"
        class="ml-auto rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Nuevo usuario
      </button>
    </div>

    <p v-if="userStore.error" class="mb-4 text-sm text-red-600">{{ userStore.error }}</p>
    <p v-if="errorAccion" class="mb-4 text-sm text-red-600">{{ errorAccion }}</p>

    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-200 text-left text-gray-500">
            <th class="py-2 pr-4">Nombre</th>
            <th class="py-2 pr-4">Correo</th>
            <th class="py-2 pr-4">Rol</th>
            <th class="py-2 pr-4">Estado</th>
            <th class="py-2 pr-4"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in userStore.usuarios" :key="usuario.id" class="border-b border-gray-100">
            <td class="py-2 pr-4">{{ usuario.nombre }}</td>
            <td class="py-2 pr-4">{{ usuario.email }}</td>
            <td class="py-2 pr-4">{{ usuario.rol }}</td>
            <td class="py-2 pr-4">
              <span :class="usuario.activo ? 'text-green-700' : 'text-gray-400'">
                {{ usuario.activo ? 'Activo' : 'Inactivo' }}
              </span>
              <span v-if="usuario.bloqueadoHasta" class="ml-2 text-amber-600">
                Bloqueado
              </span>
            </td>
            <td class="py-2 pr-4 text-right space-x-3 whitespace-nowrap">
              <button @click="abrirEditar(usuario)" class="text-blue-600 hover:underline">
                Editar
              </button>
              <button @click="toggleActivo(usuario)" class="text-blue-600 hover:underline">
                {{ usuario.activo ? 'Desactivar' : 'Activar' }}
              </button>
              <button v-if="usuario.bloqueadoHasta" @click="desbloquear(usuario)" class="text-blue-600 hover:underline">
                Desbloquear
              </button>
              <button @click="abrirResetearPassword(usuario)" class="text-blue-600 hover:underline">
                Resetear password
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <UsuarioFormModal
      :abierto="modalFormAbierto"
      :usuario="usuarioEditando"
      @cerrar="modalFormAbierto = false"
    />

    <ResetearPasswordModal
      :abierto="modalPasswordAbierto"
      :usuario="usuarioParaResetear"
      @cerrar="modalPasswordAbierto = false"
    />
  </div>
</template>
